class ReceiveFromProductionPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }
    public get enterCaseDetailsManuallyButton() {
        return this.browser.$('//android.widget.Button[@content-desc="Enter Case Details Manually"]');
    }

    public get firstProductOption() {
        return this.browser.$('//android.view.View[@content-desc="MZ-RM-C900-04 - Wheels-900"]');
    }

    public get filteredOption() {
        return this.browser.$('//android.view.View[@content-desc="FG226 - FIN226,MTO,PD,Batch-Fifo"]');
    }

    public get selectProductButton() {
        return this.browser.$('//android.widget.Button[@content-desc="Select Product"]');
    }

    public get confirmButton() {
        return this.browser.$('//android.widget.Button[@content-desc="Confirm"]');
    }

    public get confirmQuantity() {
        return this.browser.$('//android.widget.Button[@content-desc="Confirm Quantity"]');
    }

    async fillInTypeAHeadInput(textToType: string) {
        for (const char of textToType) {
            await this.browser.$('//android.widget.EditText').addValue(char);
            await this.browser.pause(10); // Adjust the delay as needed (in milliseconds)
        }
    }

}

export { ReceiveFromProductionPage };