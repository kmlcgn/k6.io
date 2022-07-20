## Installation
### Windows
To install with Package Manager:
```
winget install k6
```
or run the [official installer](https://dl.k6.io/msi/k6-latest-amd64.msi).

### Linux and MacOS 
Refer to the [official installation documentation](https://k6.io/docs/getting-started/installation/).

## Usage Instructions
* Correct the paths to your local .wav files
* Change the [thresholds](https://k6.io/docs/using-k6/thresholds/) field according to the metrics to be tested.

* Change the stages according to the type of testing:
official documentations:

  * [smoke testing](https://k6.io/docs/test-types/smoke-testing/)
  * [load testing](https://k6.io/docs/test-types/load-testing/)
  * [stress testing](https://k6.io/docs/test-types/stress-testing/)
  * [soak testing](https://k6.io/docs/test-types/soak-testing/) 

* run the command on terminal
```
k6 run filename.js
```
if you've created a k6 account, you can see the aggregated test results on [app.k6.io](https://app.k6.io/) with the command:
```
k6 run -o cloud filename.js
```
## Results
**Test 1**
Test I results are showing the difference in return times between clean and noisy .wav files.

Results of 10 successive tests (total of 20) for both clean and noisy versions.</br>
Results show that average respond time is 3061 ms for the clean sound file while it's 5145 ms for the noisy sound file.

<img width="524" alt="app_results_50VUS" src="https://user-images.githubusercontent.com/47904355/179936922-420d1108-9c49-4284-aaac-46cd5a3c4284.png">

Also, an example of full terminal output can be seen below for both clean and noisy sound files.

Clean sound file, 100 VUs:</br>
<img width="700" alt="clean_100VUS" src="https://user-images.githubusercontent.com/47904355/179937978-968413a1-63d4-4541-a499-a3911299e860.png">

Noisy sound file, 100 VUs:</br>
<img width="682" alt="noisy_100VUS" src="https://user-images.githubusercontent.com/47904355/179938100-e9513f2c-c646-4b9d-b243-3c155ab5c1e5.png">

**Test 2**
Stress test is executed. Thresholds and stages are as shown below.
```
  thresholds: { 
    http_req_failed: ['rate<0.2'], // http errors should be less than 20%
    http_req_duration: ['p(90)<10000'], // 90% of requests should be below 10s
  }
```
```
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
  ]
```
**Explanations of some fields in output data:**
|       Metric        |             Description               |
|---------------------|---------------------------------------|
| http_reqs | How many total HTTP requests k6 generated.|
| http_req_connecting | Time spent establishing TCP connection to the remote host.|
| http_req_waiting | Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”).|
| http_req_duration | Total time for the request. It's equal to http_req_sending + http_req_waiting + http_req_receiving (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times|

All metrics can be found on [Metrics](https://k6.io/docs/using-k6/metrics/).
And, stress test results are as follows:

<img width="664" alt="stress_test2" src="https://user-images.githubusercontent.com/47904355/179981477-083288f6-3417-4928-aeb3-8b5a171ef162.png">








  


