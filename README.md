# Zombies Ate My Neighbors Suite
### Fulfilld Front-End & Mobile Test Suite

This repository contains the front-end and mobile automation test suite for Fulfilld, implemented using WebdriverIO & Appium.

## Setup & Installation

### Prerequisites

- [NPM and NodeJS](https://nodejs.org/en/download/) On your machine to install and run this project.
- [OpenJDK](https://adoptium.net/) installed.
- [JAVA_HOME](https://mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/) environment variable set on macOS.
- [Android Studio](https://developer.android.com/studio) installed.
  - Set `ANDROID_HOME` path.
  - Setup Simulator (Create a Device using Pixel 5 API 34) [Guide](https://developer.android.com/studio/run/managing-avds)
- [Appium](https://www.youtube.com/watch?v=ekbud2FC34g&list=PLLz4P06JoExsvvwL2hmq7zInEpKDD1jKb&index=6) installed.
- [Appium Inspector](https://github.com/appium/appium-inspector/releases) installed.

### macOS Setup

- Open your terminal and edit the Environment Variable file:

    ```bash
    vim ~/.zshenv
    ```

- Add the following environment variables:

    ```bash
    export ANDROID_HOME="/Users/{username}/Library/Android/sdk"
    export ANDROID_TOOLS="/Users/{username}/Library/Android/sdk/tools"
    export ANDROID_PLATFORM_TOOLS="/Users/{username}/Library/Android/sdk/platform-tools"
    PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS
    export PATH=$ANDROID_HOME/build-tools/34.0.0:$PATH
    ```

- Source the changes:

    ```bash
    source ~/.zshenv
    ```

- Test changes:

    ```bash
    echo $ANDROID_HOME
    ```

Make sure you replace `{username}` with your actual username.

Ensure these environment variables are set up:

```bash
export JAVA_HOME=$(/usr/libexec/java_home)
export ANDROID_HOME="/Users/{userPath}/Library/Android/sdk"
export ANDROID_TOOLS="/Users/{userPath}/Library/Android/sdk/tools"
export ANDROID_PLATFORM_TOOLS="/Users/{userPath}/Library/Android/sdk/platform-tools"
PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS
export PATH=$ANDROID_HOME/build-tools/34.0.0:$PATH
```

## Windows Setup

- Determine the Android SDK installation path by typing where android in the terminal.
- Add the Android SDK path to environment variables:
```bash
set ANDROID_HOME=C:\<installation location>\android-sdk-windows
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

- Verify the setup by running echo `%ANDROID_HOME%` in a new Command Prompt.

For further reference, you can consult the [Spring.io Guide for Android](https://web.archive.org/web/20180210044548/http://spring.io/guides/gs/android/) 

## Running the project

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run npm install or npm i to install the project dependencies.
4. Launch your Android emulator (Pixel 5 API 34).
5. Execute the test cases by running npm run wdio.

![273662312-f178514a-47e9-4675-8d85-9b4100c73008](https://github.com/fulfilld/test-automation/assets/151062558/de9f5de0-5661-49c6-ae6f-9c211c94ecc3)


# TestingBot Integration with WebdriverIO

## Overview

TestingBot is a cloud-based platform for automated testing of web applications across various browsers and operating systems. By integrating TestingBot with WebdriverIO, you can easily run your automated tests on TestingBot's infrastructure, allowing for efficient and comprehensive cross-browser testing.

## Setup Instructions

### Sign Up for TestingBot Account:

- Go to the [TestingBot website](https://testingbot.com/) and sign up for an account if you haven't already.

### Install WebdriverIO TestingBot Service:

- Install the `@wdio/testingbot-service` package using npm or yarn:
npm install @wdio/testingbot-service --save-dev
or yarn add @wdio/testingbot-service --dev


## Configure WebdriverIO Configuration File

Add TestingBot service to the services array in your WebdriverIO configuration file (e.g., `wdio.conf.js`):

```javascript
services: ['testingbot'],
```

## Provide TestingBot Credentials

Set your TestingBot username and access key as environment variables or directly in the WebdriverIO configuration file:

```javascript
testingbot: {
    key: '<your-testingbot-access-key>',
    secret: '<your-testingbot-secret-key>'
}
```

## Run Tests on TestingBot

Once configured, you can run your WebdriverIO tests as usual. They will automatically execute on TestingBot's infrastructure.

## Additional Resources

- [WebdriverIO TestingBot Service Documentation](https://webdriver.io/docs/testingbot-service)
- [TestingBot Documentation](https://testingbot.com/support/)

By integrating TestingBot with WebdriverIO, we can ensure comprehensive test coverage across various browsers and platforms, helping us to deliver high-quality web and mobile applications.


# Running WebDriverIO Scripts

#### 1. Running Cucumber Tests:
- To local run Cucumber tests for web, execute the following command:
  ```bash
  npm run cucumber:webWdio
  ```

- To local run Cucumber tests for mobile, execute the following command:
  ```bash
  npm run cucumber:mobileWdio
  ```

- To local run end-to-end (e2e) Cucumber tests, execute the following command:
  ```bash
  npm run cucumber:e2eWdio
  ```

#### 2. Running TestingBot Tests:
- To run TestingBot tests for mobile, execute the following command:
  ```bash
  npm run testingBot:mobile
  ```

- To run end-to-end (e2e) TestingBot tests, execute the following command:
  ```bash
  npm run testingBot:e2e
  ```

#### 3. Generating Allure Report:
- To generate and open an Allure report based on test results, execute the following command:
  ```bash
  npm run allure:generate
  ```


### Performing Manual Runs with GitHub Actions UI

1. **Navigate to GitHub Repository:**
   - Open your web browser and navigate to test-automation repository.

2. **Access Actions Tab:**
   - Click on the "Actions" tab at the top of the repository.

3. **Select Workflow:**
   - On the Actions page, you'll see a list of workflows. Select the workflow file you want to run manually (e.g., `Run for Web App`, `Run For Mobile App`, `Run For E2E Cases in testingBot`).

4. **Initiate Manual Run:**
   - Once you've selected the workflow file, you'll see the workflow details. Look for the "Run workflow" button in the upper right corner of the page and click on it.

5. **Confirm Branch:**
   - GitHub will prompt you to select the branch for which you want to run the workflow. Choose the appropriate branch (e.g., `dev`) and click on the "Run workflow" button to confirm.

6. **Monitor Execution:**
   - GitHub Actions will now initiate a manual run of the selected workflow on the chosen branch. You can monitor the progress of the workflow execution directly on the Actions page.

7. **View Results:**
   - Once the workflow execution is complete, you can view the results, logs, and any generated artifacts directly from the Actions page.

8. **Re-run Workflow (Optional):**
   - If needed, you can re-run the workflow manually by following the same steps outlined above. This can be useful for debugging or re-executing workflows as needed.




