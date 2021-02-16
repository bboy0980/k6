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
                { duration: '3m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 3 minutes.
                { duration: '7m', target: 100 }, // stay at 100 users for 7 minutes
                { duration: '2m', target: 0 }, // ramp-down to 0 users
            ],
            gracefulRampDown: '60s',
            gracefulStop: '60s'
        }
    },
    thresholds: {
        http_req_duration: ['p(99)<50000'], // 99% of requests must complete below 50s
        errors: ['rate<0.01'], // <1% errors
    }
};

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

// prod 188.40.137.159
// staging 5.9.51.83
const BASE_URL = 'http://188.40.137.159:4002/GPHub/GPHubService';

const PAYLOAD = `<soap:Envelope xmlns="http://www.opentravel.org/OTA/2003/05" xmlns:ota="http://www.opentravel.org/OTA/2003/05" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Header/>
<soap:Body>
    <GP_SessionID>455.324944067358</GP_SessionID>
    <OTA_HotelAvailRQ AvailRatesOnly="true" BestOnly="false" EchoToken="54039685" PrimaryLangID="en" RateRangeOnly="false" Version="2">
        <POS>
            <Source>
                <RequestorID ID="stb" MessagePassword="stbpwd" Type="22"/>
                <BookingChannel Type="7"/>
            </Source>
        </POS>
        <AvailRequestSegments>
            <AvailRequestSegment>
                <StayDateRange End="${ISODateString(addDays(new Date(), 2))}" Start="${ISODateString(addDays(new Date(), 1))}"/>
                <RoomStayCandidates>
                    <RoomStayCandidate Quantity="1" RPH="1">
                        <GuestCounts>
                            <GuestCount AgeQualifyingCode="10" Count="2"/>
                        </GuestCounts>
                    </RoomStayCandidate>
                </RoomStayCandidates>
                <HotelSearchCriteria>
                <Criterion>
                    <HotelRef HotelCode="638504f8b34f36b937e73b6140d524b7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="173979c79599dc0611efa96d6f330335" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="63298953b16b76b2cd7cf15420a2142a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e352208428d5f640ff6fb175687ad674" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="f68b36db1972a788dc8ac1455999870a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="78e8d1d02fa667566816c4c1c76f9bab" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="d342fe8efb685444ec2c2554b3b0720d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="25d384e6e48a8262189d05fc2fa68b8a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="099c22eae0c1affb4d2caa57104c5d50" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b7a4a9aef6fe32b30030a27dc4072d2d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c022855e41594ed60a83599845a42527" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6c035c93924daf2ec5c820681065e0a3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e717948ea5f1ac4014806fb29abb1ba7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ec5b8acf59d20392a5e832e30434d459" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e193d1fb8e315543be566fd59ed741d4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="bc3775dada601e75c8336b24c0ec9445" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="3243dbc98c90eb026c4e4ab590b35716" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="096e8ef3b28da2ec2f42772ccd2d8b07" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="69f5d48fa9b1bef25fc914a8de5161d9" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="98dfd926feb2a97fea9b15990d48c6c3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="387af9ef9d07d7a8e7c043de79b03707" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8563534b80954272aec09e85868b5634" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6b5f9db19c7fdeae0bce116a56c1f2e5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8ea8b434f0656bd9a43ff2c52f712e11" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b7bb52671093e0a200ac1a7e4849a415" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a87e12a7a37d76545c4545df5d328570" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="24fa8ff77798b81020b0cb6d63c81d65" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="932d1fab88f9a0b9fbe36f8fade8f46a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="00611393d233888e82edef687c5026d2" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a08d5722de355398844f1669e1f91cb8" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="317c79ef803da3d28cd440a80034a086" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e9d9a19c8c57c2b45350ec1559553bf4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="9186e8697d27e23180e6e71d113937c4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="79c95d039924a198f408a986e930660b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ab015315f0b0e58b207138824aba6ca4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="5be01c2a5a548ec929d6bef607db9574" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="42c779260a8bcffb9e6df640f5ca1d0d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b3ee2385e8047846a0dbedacab85ae90" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a244c90696578f016b766e699803ff4f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="cc809132e9344b86adbf2b4bdb5a524b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="5364768edbdd8ca4959103c4d1093cdb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="7b4d74c96ebf71b297cdd6430195e3e0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="7c5ff7e66602aff11d2e340fae15f14f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a8c57947c9032e2c20ecef498d0d8473" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="813c303b991955c93b5475e05ef2099c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b002b18edcd1a446f349ffa5f98eaa49" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="41302a8a6ddbc1feb093db10490b5228" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="9c910dcb3321571253825a8ed3f334bd" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="49835b894a2dcf747b6b6342e2171ab7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="354e17f4d7f3429f7bf8799740562118" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="23dbdb157dd6a4cc9f19f4e1a59ab8e6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="dd5993d2ad697cea9f60d74140b0a4d8" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="3add63896d5fcf27e967d05f5d6d85d2" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6b3a11dbca3da4110ea2a6c7bf7ced14" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="f45846cdb8debcdc02431ff1badf15f6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="822e98a7066ab9259654fbcc48e54f3c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6c06c2e671c6fbf073cd10a84abc5a9c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="46eccef718b25ce8a0959c249fb4017f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="edde5d5e6f0eb0e8e1d3df2d44113f83" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="39d891c17a7a85fc2599c7323cab5444" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="9e6010277cd06ce776bd513d553e21d0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="cbf0a9503fd50e28e890e5295f341755" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="5c6147d5f3f098cbe5aad1e504eedc5e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="973c35cf4eeb254304e70171d69b930c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="4d6ac4297f69ff7c736a6070d8487561" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="77d44263a94bdb5c3112e4fd9007acf8" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="9a855cd8175f299c0b26f28035740348" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="79d81ff53ec7a4a06d9dfc8c192f35d5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="1f830297685622a57f3f86e3e0bd09e7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="747e0902caa527b16a17f593936e7ff9" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="bc0dfd471c0dfeef6053146815d99788" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="57cdb0218d5875899ea7bebf26313133" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="451b96ec88343fe88370bd151aa4796f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="5c310c85988b1503879713822fb2b191" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="042bc473c30169f4683c964242d283e4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e6a44a367790ebc2b68d7fac2d780f1c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="d80ded92401fd50e3c0c7dbbaf6d503b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8d6bb320f80a8140766256778b2d0605" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="204c9acd1c2b9df0d42448296b433edf" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="456b53e8a6fcfa9e57e792273fc35f18" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a3add74e9ed7aa079ae98d12570db7ca" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="2708f83383aa3e70542ac77b5e46a946" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="686126748f988b1230111e9a85c407ed" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="eb957efdff368a044c546e003b901e2b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c76bdb135a1aec9895b6f5c146f0e4ef" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b9cf1cf5afce8d507d60d47b0317db53" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="1f1de57baf907bf91e745232e8f4ddc3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="9ce88143022d39f70ae9f92afa616b72" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="0b2b88e50697f484d7b3fd2f1b9b0c0b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="11e6cb336647ce4333e5b100e6f8bf62" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="13158c6824d2511ab3bb81f2f48366a4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="7d031dcc0633701fd73b461ba42a5684" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="4db5b436da16f15854e810663533485a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="fd1ae48e00a668a612ac578ba0554f31" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="d2b33c7949b3f88bf2971c996942d56e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="211a697fbd964a16d2f9b8adc1c51ac7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="4158d6c592e7c90284e0cadb016dea55" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="741bc6e7042c4230b9c1127bda68f511" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="90d743cd189fbc2aefd4d8e052c5731d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="cb66b3d952942edb4fec2ed27fab749b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e3610f6a6e2a7a81146c4df188cf3eb3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="104835c0cb874e08ad6cc50939293fb5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ccf80403d54210cc665713ac99f3a234" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="d5ef3eac210474988407fe15c56c8e1a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c11345d5aa01d474c1deac356ec27aea" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="25a559ea927a73b13c126ff38315cfaa" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="bf0b468e3cc14acbdd8f8b036b6d8ba7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="05b386dd35f1eae173a954464cc7fd35" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c90bb4afdc6d602e7d95acb5a9976666" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="2cf12580e83b47a4571473360055532b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="fcbf9a931c26947dace736c4140c76b5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e451a7fd7f03b16eb4a13a9a189462f1" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="cd4212170ed848dc731e7b649b2c39a0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="875d883d4411c841d56e3bc9379ddff4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8650b8547280b87e4d194085fe53d3f5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="878e5bb1751c9cfe32dfc0428bd253fb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6530c6e62ab739fa7873e1829c59fc17" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="2a225af3244fb7a946699943ff0c5b99" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="355476ad5eb039f39da15b1711151017" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="98ba4b663a555d984f4255d77715912f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="7466754b9cc74d665cb104e650dd62cf" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b2e894acd0104a6975cd1032f0da608c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b5c3cfb8cfc037d9cdea578940afda0b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a68fddb94692d829a0f8b48851163e08" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c5a837a4623e506af2815f5c7a85a045" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="39678463d3bec2aa5eb9bcf231967657" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="19526160e7bae5dcde77975a0af25e7e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="890de24c6707cf4161a5a376ced15b7a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ee987f81988ce6ab529dbc7cf7294058" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="fe51da8076d9790dae915bc54c9d958c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8491bbeb7914ec9b5fd3cd121f6c01bd" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ef6949f7a7737489e24c4e3831f185cd" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="4a5618d9a07231fe4678e6d3fb59e679" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c741a8f6067b8674deddb7db744d3179" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8a693efd2529e7622aff64d0053079b6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ca424d37f9f36cd31456e4d1fcbd1a4c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="bcc370ae39b3f4aca2660f6cda83bb1b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="5daa28cc5d242b1d31f8d6e327c32a80" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="db5a6f3700cd8cb3835ea7f6e8bcafd5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="3f1887a0e239f7a786ba17a0ea815060" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="24bb9ea21e7893d4c6bd3cb15582f15a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="cfa3e46b3fd9935ee46a0d57ea7629c6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6638532d51f0a8e7b1b0628742b4826c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="55d1176934f12ffe2ab24689032a3c33" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="0e298619a38222f1045d62b0f6a95ff3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c20be29382d2360d24347bc17d9ca509" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8c47b888e0dc34f89d02f33d749261f5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e7cc77fb6b4581257a9747db3eabdee6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="f9942d9b8a1f9c6155800f96916c065a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="1186444e64fc00c4a9913b4ecff51be8" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="180dbb75d1ef4b996578db09ab5c3571" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="715839bf527fcf1f44639b0e9a0a2d40" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8afae2cd39de4f460a34f5fd009fb260" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="f4982a292830024e77037506b53e31fe" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6f4cf689710f6bb6d26b550062fb45b3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="dba29b5033ae62178d1deabcbcece4ba" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="850b67f89a9eb754daf3d9a473681b27" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="80f4f13f1dae4e48986d879c3e8be64d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="cb151851345f31aca9c9a4696ec70662" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="0596da5fcdca107e734512647a7407db" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="d4d63d50f70aab889d49939402878dd7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="84cac848ac5d84ba400feebccf9c5c5b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="41c142741dcef7d01f04f717fa51c4dc" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a86df644d5b4cdb49d6dabba84365ff5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="036f3f73d9919fe5679ae46e1dc70814" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ffffd6ea5433968cc882ac4e1a8c23c7" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="82f149368c4a00cbdb699c87e1007495" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="2441368b7a4cfb048a168c5568cc597e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="7cbc57ccdf36e1717bb039561749f792" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="59371eb267a25d44fb8813c8da63f4ad" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="3d3edf6d17cbc8c9b92668e61004284a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="56acf810a9c675c4b5d83346280ab97d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6c987d4cf67392896063c29b8152b723" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ee57bb73f5c78e9f0c38f6b32525aca3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6457354cfc3daf38490c467a078383b2" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="de31891435a74cb2d8357579a38e3aaa" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="217bc30817fb87522060d3e0d6729ae2" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="67f79e66663eeae799154ff7f878db13" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="2af95c69fdb9a8459f603f890107755c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="dae1a93fd79320f21497ab88013727a3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="b738acea412e42dc6957a9d7b4ed0a37" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="4f59ee127cb582402a2c1ec39c46baad" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a8c3b4ac946ac8da8f595c8b78ba08f0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="64e99d21c6cda02081f9f53f0a39d407" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="357218d4a160db36a75032a9fb43cb37" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="a7790b6fa741e4bab4bc7f9fd4da928a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="89fd76c1f09677cef7193f329059c20a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="d727000bbf5f5de943e7619b2650392d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="bd20b14e4835ca6814faf7c2fb758d6a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6b496de5471a99da8f407e43889409c6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="8e792538ed46aab7b705995d1f1fae41" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="e5959343c4a62e12c1d8dfebc6e80d4c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="ed789a525d55eeea8e9bfa07d4f8a809" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="1f6a5f3fd7ad7926bfc6135c69088e18" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="f09eee150f61d634fdaea94db92d9dfe" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="73e8de5752e41a5fe61a0b732d88dd50" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="bd459e087f9e033154605de0c15ff9f0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="6db0da399f4a15f041ed98e28496280f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="c9744a05ecc2d2e91e9b2a1d66f28efe" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                <Criterion>
                    <HotelRef HotelCode="1bf83039594857c0bb93d58d34117ba5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="fa549ba5b956c9bc6c8b1f3e73e38994" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="1082abf231ef0b3ae49c5a180b7451a1" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="0e0cb9b74b7b33375cb223ecb9e8172d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="14659e8d9c2e6c00034163e58ae1d115" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="4cf817a822ecaa36c94e88f31ba6f236" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="958602e98502048211387045ff6f1551" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="4c784779f23ec7d6c08f8d04a5d6b234" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="1f971b3e73dd0683f61e9113173855f0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="4894c244b069cb51e229a0b4b84bb6d3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="5def2a1b0d81532406258bf9961559f3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="350ca0a9328de6017f06d0cb711b989c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="903ced80d28ca642899669d1b35b5d18" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="f4682b95c9767f5787a15e4fb60fe61e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="d98314fccdfaf839d3ccb25acc95357e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="3fa97ee5af57c402018d2a93cd4f074d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="1807b27f1071cc21a9c930d7505dd970" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="39d7f90e0c78e125395b934c7d430458" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="c8533ee7ccf430e7f7c2981c722b9a7c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="e18baefaa420a7b96d2007e2f6582a39" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="c8a6d4cf887c8247fa261e38994e1658" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="c827245ab11ef1f6a59146879d6d8bdb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="9e0ebe08c0356e49dbb2bde2eec79c70" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="b3326f6356dd34309c07a8bac0c56782" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="bad49cf5e1c877f7248b0d01115f3849" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="2e2d46dcdfabb6c6aebef96cf5e194e9" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="2c2361ea540167a756f4b52292e758cb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="9ef6b6fcbd309b271ab7b062590f0f75" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="863ab8f6b28030c625f709a4ab6f0312" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="ae7309658f13fbc0a0df474bf93590e6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="09edb9851e73b05af88e8a30b1456903" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="9399646ce8b6a11a8961573cdeabbaa6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="26eb4fb1e9706f60d7c8835a3a0c259b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="fe695aa3d8dfdddcf90766b4e1992fe2" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="fedd2b34ef3548da326b423fe6a7d01a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="999bc49ec62250ccb653c41413e83565" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="aa180dcc145386190474c8d13f4036fb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="2ffb51a7b872d773a07085a959409ded" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="5b7c0d47cadc9ed68bf944bf64d876f0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="e3e5832cf47752251846d77d09d42999" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="cc05dbc8c753eee2b3852dcc3eb0d839" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="6d9410620486b374cf054f47026e8232" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="9bc16b74247c2e5f9a54ec7579da12b8" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="e70723cee986a79f209c64023c18901d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="d9fefc4f65c19f7047f0b212477b6813" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="70b877d1775cecd1c05ce485983780cb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="0121ed3f5c2368703bf90991acbda60e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="7db5fb49f8a5e57d87ffdc91dad6a942" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="5a136090d3852f18ba2ea411509bbdb1" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="0d6999fde28cf79c6e7491d634d248ac" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="8850c6c901d41291efe5bfdfd903a60a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="4ea692e85110a97bfdd7e8be5ebf8616" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="a130702dc82f145651a5b3edc5389255" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="a906d9d2b59c2103bce9e76b0f336404" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="b907b36f380bbd97110e73dc3efd51f5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="cf02f7d6d48e9091b99bd0b10d97b3e0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="ef76eb262f3b57392553d70d80d4994f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="bc496309d032f30e9a28a42ad344efd9" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="37f3a515185fe8ced86f724aec6ac8d6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="784b094ea172f6a571b3a0c3831723f3" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="4c44879fa2324cb31be126b499873e05" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="d4b527cedfc9ed6254103c4cc5846040" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="327cbd36e0f2dfe43fa3418dee03c17d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="52e1d9399142c45f8104083390792b0c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="f63f53741c2d65e1fbadbf08d3c0e3af" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="33b64014d5ed065b73f0c7d5e9eec503" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="99e593fbff1cbfc94894effacae6eb3a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="b6bcd1514d7510d774f1f86f3bb9aff5" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="0ea69200aa08ea7c62ff49928bd9a8c6" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="5baf53ff2748363e6638f8cad007c54c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="309c8705d9409c66d3f21b0dc28a6ccb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="37a92bc28346946a0fc5c8961ca7215e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="0a2a37ad8c8c9d492472e42e9811157c" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="c4fa91c3ea1b05c86870c7f4f868f2c0" HotelCityCode="965843761" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="8fcafbe77e23058925c7538a6d7e0e03" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="e827f70094bee317910be65c7c8065f4" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="510c6ca3600f43a7618afd97249d6bcb" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="20010263f67d199dbe2c013fa8735890" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="fd1714165f68ad6de65371106af9d860" HotelCityCode="965843761" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="79a008a2efdda8e9c4c1cf09ad47c16a" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="8606090d7977789274a5ff7978e657cf" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="01bef8438c885ecd3a73536119315eee" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="93401eea0ccb926ec759a151d8ee305e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="e895f04fcd0141e04627db6eaa339c73" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="2c033682d5ef5aba3ed64e57226cd0b1" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="cabbb0e905deb9e20fc04d3566e172b1" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="154de689decf5f8a104ecf79611f775d" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="88de5604e939e8437af31f3dbdb0ae43" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="047ed41604ae6c2c4b902903b99bdb72" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="3bd1c3dadea83e74069130330e16c780" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="267f78ca73542165965206aa99c41ffa" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="786b3824745796ce697ec7ff60f7236e" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="57434b02e2186f86dbc1766d66fb842f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="148eb5a0d24685557112a292d87fa714" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="fb3fdc7925b6981b99da76927de75fd9" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="3466c177afb554ebc1435c5762f3f859" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="e42f863d00c18cb435212bc7a508e6c0" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="f41ff1935cd3c972c234767fda8e79d9" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="8aeb7f10d69e5f973c467c408ff62c9b" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="d86476d7093224385b2dbf9c2f8bf6ac" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                    <Criterion>
                        <HotelRef HotelCode="f22d2c13234308d68fa5a7dc704a0c9f" HotelCityCode="2114" HotelCodeContext="ostrovok"/>
                    </Criterion>
                </HotelSearchCriteria>
            </AvailRequestSegment>
        </AvailRequestSegments>
    </OTA_HotelAvailRQ>
</soap:Body>
</soap:Envelope>`;

export let errorRate = new Rate('errors');

export default () => {
    let res = http.post(BASE_URL, PAYLOAD, { headers: { 'Content-Type': 'application/xml' } });
    let result = check(res, {
        'status is 200': (r) => r.status == 200,
    });
    
    if (result) {
        errorRate.add(res.body.indexOf('Warning Code') !== -1);
    } else {
        errorRate.add(!result);
    }

    sleep(1);
};
