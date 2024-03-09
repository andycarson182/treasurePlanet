class CommonPageElements {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    async clickElement(element:any){    
        await this.browser.pause(4000);
        await (element).waitForDisplayed({ timeout: 15000 });
        await (element).click();
    }
    
}

export { CommonPageElements };