class DeveloperToolsPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get spinnerIcon(){
        return this.browser.$('svg.MuiCircularProgress-svg');
    }
    public getDataGenerationButton(option:string) {
        return this.browser.$(`//button[contains(text(), "${option}")]`);
    }


}

export { DeveloperToolsPage };