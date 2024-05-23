class CommonPageElements {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get textInput() {
        return this.browser.$('//android.widget.EditText');
    }
    
    async clickElement(element:any){    
        await this.browser.pause(2000);
        await (element).waitForDisplayed({ timeout: 15000 });
        await (element).click();
    }

    async fillTextInput(value: string) {
        const textInput = await this.textInput;
        try {
            await this.browser.pause(2800); //This is for UI delay
            await (textInput).click();
            await textInput.setValue(value);
        } catch (error) {
            console.error('An error occurred while interacting with the input element:', error);
        }
    }
    
}

export { CommonPageElements };