# QA Engineer Assessment Solution

## Introduction

[GitHub](https://github.com/nextlevelbeard)

[LinkedIn](https://www.linkedin.com/in/sudoricardobarbosa/en)

Hello, I'm Ricardo and this is my solution for the challenge.
I based this solution on a boilerplate I've been working for some time.
The tests case is located [here](tests/e2e/features/TaskSearch.feature) and the user for the test can be edited there.

## Folder structure
- /
    - [.idea](.idea) - Run configuration for your convenience
    - [.run](.run) - The folder aggregating the latest test run artifacts
        - [features](.run/features) - Running in parallel mode will split scenarios into feature files, they are store here
        - [logs](.run/logs)
            - [wdio.log](.run/logs/wdio.log) - Main process log file
        - [reports](.run/reports)
            - [allure](.run/reports/allure) - Historical Allure report
            - [cucumber](.run/reports/cucumber) - Latest run [Multiple Cucumber](https://github.com/wswebcreation/multiple-cucumber-html-reporter#readme) test report
        - [results](.run/results)
            - [allure](.run/results/allure) - Allure XML results
            - [json](.run/results/json) - Cucumber JSON results
        - [shots](.run/shots) - Screenshots are stored here
    - [tests](tests) - Base tests folder, contains E2E tests
        - [e2e](tests/e2e)
            - [components](tests/e2e/components)
            - [configs](tests/e2e/configs)
            - [features](tests/e2e/features)
            - [screens](tests/e2e/screens)
            - [steps](tests/e2e/steps)
            - [utils](tests/e2e/utils)
        - [base.conf.js](tests/base.conf.js) - Base configuration for tests E2E or not
    - [docker-compose.yml](docker-compose.yml) - A Docker compose file to bring up a local [Zalenium](https://opensource.zalando.com/zalenium/) grid

## Bootstrapping

My custom webdriverIO-based project however needs at least Node 12 LTS.
If you're running `nvm`, you can simply run:
```shell script
# nvm install 12
nvm use 12
```
Install the dependencies
```
npm install
```
There are several options to run the tests as highlighted by this table:

|  Description | Automation Protocol | npm script  | Configuration file |
|---|---|---|---|
| On any local Android device  | webdriver/UIAutomator2 | `test:e2e`/`test:e2e:local` | [local.conf.js](tests/e2e/configs/local.conf.js)  |
| Against BrowserStack                      | webdriver/UIAutomator2                | `test:e2e:bs`    | [bs.conf.js](tests/e2e/configs/bs.conf.js)  |

To run a specific feature file pass `--spec` flag to the command with the path, something like:
```shell script
npm run test:e2e -- --spec tests/e2e/features/TaskSearch.feature
```
For specfic Scenarios, in the `--spec` file passed, add the line number of the Scenario
```shell script
npm run test:e2e -- --spec tests/e2e/features/TaskSearch.feature:6
```

To run the test locally you'll need:
- To have everything in place to run appium. Get `appium-doctor` with `npm install appium-doctor` and take care of it.
- A local Android device USB-connected to the device running the test.
- Google's `Photos` app installed on the device.

To run the test on BrowserStack you'll need:
- To define `BROWSER_STACK_USER` and `BROWSER_STACK_PSW`

## Reporting

There are two reports you can browse.

### Allure

If it was not done automatically, you can generate the report after a test run with
```javascript
npm run report:generate
```
You can then serve and open it by
```javascript
npm run report:open
```

### Multiple Cucumber
You should be provided a link to the automatically generated HTML file after the test run.
Either way, the last run report always kept in `.run/reports/cucumber`.
