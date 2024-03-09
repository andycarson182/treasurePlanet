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




