import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import urlencode from 'https://jslib.k6.io/form-urlencoded/3.0.0/index.js';

export let options = {
  stages: [
    { duration: '5m', target: 50 }, // simulate ramp-up of traffic from 1 to 50 users over 5 minutes.
    { duration: '10m', target: 50 }, // stay at 50 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<35000'], // 99% of requests must complete below 35s
    errors: ['rate<0.01'], // <1% errors
    hotels: ['rate>0'], // hotels availability always>0
  },
};

const BASE_URL = 'https://search-api-preprod.staybonanza.com/api/v3/hotels';

const BASE_PARAMS = {
  destination: 'London, England, United Kingdom',
  rooms: 1,
  adults: 2,
  bounds: {
    ne_lat: 51.6723432,
    sw_lng: -0.3514683,
    sw_lat: 51.38494009999999,
    ne_lng: 0.148271
  },
  currency: 'EUR',
  sorts: {
    distance: 1,
  },
  center: {
    lat: 51.5073509,
    lng: -0.1277583
  },
  geolocation: {
    radius: 47.136241122470196,
    unit: 'km'
  }
};

export let errorRate = new Rate('errors');
export let hotelsRate = new Rate('hotels');

export function ISODateString(d) {
  function pad(n) {
    return n < 10 ? '0' + n : n
  }
  return d.getUTCDate() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCFullYear());
}

export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default () => {
  let dateParams = {
    checkIn: ISODateString(addDays(new Date(), 1)),
    checkOut: ISODateString(addDays(new Date(), 2)),
    page: 1
  };

  let hotelsParams = Object.assign(dateParams, BASE_PARAMS);

  let res = http.get(`${BASE_URL}?${urlencode(hotelsParams)}`);
  let result = check(res, {
    'status is 200': (r) => r.status == 200,
  });
  errorRate.add(!result);

  if (result) {
    let hotelObjects = res.json();

    // console.log('F1', JSON.stringify(dateParams));
    // console.log('URL', `${BASE_URL}?${urlencode(hotelsParams)}`);
    // console.log('R1', JSON.stringify(hotelObjects));

    let hotelsCheck = check(hotelObjects, { 'hotels available': (obj) => obj['hotels']['data'].length > 0 });
    hotelsRate.add(hotelsCheck);

    if (hotelObjects['hotels']['pagination']['last_page'] > 1) {
      for (let page = 2; page < hotelObjects['hotels']['pagination']['last_page'] - 1; page++) {
        dateParams = Object.assign(dateParams, { page: page });
        hotelsParams = Object.assign(dateParams, BASE_PARAMS);
        hotelObjects = http.get(`${BASE_URL}?${urlencode(hotelsParams)}`).json();

        // console.log('F2', JSON.stringify(dateParams));

        hotelsCheck = check(hotelObjects, { 'hotels available': (obj) => obj['hotels']['data'].length > 0 });
        hotelsRate.add(hotelsCheck);
      }
    }
  }

  sleep(1);
};
