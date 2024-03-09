class AgendaPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }
    public get plusActionButton() {
        return this.browser.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button');
    }


    public get createTaskButton() {
        return this.browser.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.widget.Button[1]');
    }

    public get manualReceivingButton() {
        return this.browser.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.widget.Button[2]');
    }

    public get lpBinToBin() {
        return this.browser.$('//android.widget.ImageView[@content-desc="License Plate Bin to Bin"]');
    }

    public get textInput() {
        return this.browser.$('//android.widget.EditText');
    }

    public getSearchedLicensePlate(licensePlateNumber: string) {
        return this.browser.$(`//android.widget.ImageView[contains(@content-desc, '${licensePlateNumber}')]`)
    }
    public async fillTextInput(value: string) {
        const textInput = await this.textInput;
        try {
            await this.browser.pause(3000); //This is for UI delay
            await (textInput).click();
            await textInput.setValue(value);
        } catch (error) {
            console.error('An error occurred while interacting with the input element:', error);
        }
    }

    public async selectLicensePlateNumber(licensePlateNumber: string) {
        const searchedLicensePlate = await this.getSearchedLicensePlate(licensePlateNumber);
        await (searchedLicensePlate).waitForDisplayed({ timeout: 15000 });
        await (searchedLicensePlate).click();
    };

}

export { AgendaPage };