import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import urlencode from 'https://jslib.k6.io/form-urlencoded/3.0.0/index.js';

export let options = {
  discardResponseBodies: false,
  scenarios: {
    searches: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2m', target: 100 },
        // { duration: '5m', target: 150 },
        // { duration: '1m', target: 0 },
      ]
    }
  },
  thresholds: {
    http_req_duration: ['p(99)<7000'], // 99% of requests must complete below 7s
    errors: ['rate<0.01'], // <1% errors
  }
};

//!!! possible only in case of existing ssh tunnel
//!!! example: sudo ssh -i ./id_ed25519_orange -o IdentitiesOnly=yes -L 80:127.0.1.1:80 -N docker-tunnel@82.221.128.196
const HOTEL_UUID = '5fc07b79-6ec2-44aa-831b-90eb0baa4f6d'
const BASE_URL = `http://localhost/availability/${HOTEL_UUID}.json`;

export let errorRate = new Rate('errors');

export function ISODateString(d) {
  function pad(n) {
    return n < 10 ? '0' + n : n
  }
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
}

export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default () => {
  let dateParams = {
    arrival_date: ISODateString(addDays(new Date(), 1)),
    departure_date: ISODateString(addDays(new Date(), 2))
  };

  let res = http.get(`${BASE_URL}?${urlencode(dateParams)}`);
  let result = check(res, {
    'status is 200': (r) => r.status == 200,
  });
  errorRate.add(!result);

  if (result) {
    let availsObjects = res.json();
    check(availsObjects, { 'availabilities': (obj) => obj.length > 0 });
  }

  sleep(1);
};
