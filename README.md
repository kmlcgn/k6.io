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

* run on the terminal with
```
k6 run filename.js
```
if you've created a k6 account you can see the aggregated test results on [app.k6.io](https://app.k6.io/) with the command:
```
k6 run -o cloud filename.js
```

## Results
Results of 10 successive tests (total of 20) for both clean and noisy versions.</br>
It's clearly seen that average respond time is 3061 ms for the clean sound file while it's 5145 ms for the noisy sound file.

<img width="524" alt="app_results_50VUS" src="https://user-images.githubusercontent.com/47904355/179936922-420d1108-9c49-4284-aaac-46cd5a3c4284.png">

Also, the full terminal output can be seen below for both clean and noisy sound files.

Clean sound file, 100 VUs:</br>
<img width="700" alt="clean_100VUS" src="https://user-images.githubusercontent.com/47904355/179937978-968413a1-63d4-4541-a499-a3911299e860.png">

Noisy sound file, 100 VUs:</br>
<img width="682" alt="noisy_100VUS" src="https://user-images.githubusercontent.com/47904355/179938100-e9513f2c-c646-4b9d-b243-3c155ab5c1e5.png">





  


