import "./libs/shim/core.js";
import http from "k6/http";

export let options = {
  // more thresholds can be added
  thresholds: { 
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],};

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
