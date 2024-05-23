class Putaway {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get unexpectedBinHeader() {
        return this.browser.$('//android.view.View[@content-desc="Unexpected Bin"]');
    }
    
    async getUnexpectedMessage(destinationBin:string, message:string) {
        return this.browser.$(`//android.view.View[@content-desc="${destinationBin} expected but ${message} was scanned."]`);
    }

    public get tryAgainButton(){
        return this.browser.$('//android.widget.Button[@content-desc="Try Again"]');
    }

    public get overrideBinButton(){
        return this.browser.$('//android.widget.Button[@content-desc="Override Bin"]');
    }

    public get binNotAvailableButton(){
        return this.browser.$('//android.widget.Button[@content-desc="Bin Not Available"]');
    }
}

export { Putaway };