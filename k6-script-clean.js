import "./libs/shim/core.js";
import http from "k6/http";

export let options = {
  // more thresholds can be added
  thresholds: { 
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(50)<20000'], // 95% of requests should be below 200ms
  },
  stages: [
  { duration: '5s', target: 50 }, // ramp up 50 VUs in 5 sec
  { duration: '5s', target: 50 }, // stay in the same state 5 sec
  { duration: '5s', target: 0 }, // scale down to 0. Recovery stage.
]};

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  collection: {
    baseUrl: "/"
  }
});

const files = {};
files["C:/Users/kemal.sertkaya/Desktop/samed-test-sounds/clean_testset_wav/p232_100.wav"] = http.file(
  open("C:/Users/kemal.sertkaya/Desktop/samed-test-sounds/clean_testset_wav/p232_100.wav", "b"),
  "p232_100.wav"
);

export default function() {

  postman[Request]({

    name: "Evaluate Speech",
    id: "29b52f56-b743-456d-9f62-3238dea24541",
    method: "POST",
    address: "https://samed-duman-testb.speech-critique.test.core.devops.sestek.com.tr/v1/audio/speech/inference",
    data: {
      audio: files["C:/Users/kemal.sertkaya/Desktop/samed-test-sounds/noisy_testset_wav/p232_100.wav"],
      applyVad: "false"
    },
    headers: {
      Accept: "application/json"
    },
    post(response) {
      pm.test('Status code is 200', function() {
      pm.response.to.have.status(200);
      }); }

  }
  );

}
