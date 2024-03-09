class LicensePlateB2b {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get badCodeButton() {
        return this.browser.$('//android.widget.Button[@content-desc="Bad Barcode?"]');
    }
    
    public get searchButton() {
        return this.browser.$('//android.widget.Button[@content-desc="Search"]');
    }
}

export { LicensePlateB2b };