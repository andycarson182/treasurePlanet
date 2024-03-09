class WebLoginPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get emailField() {
        return this.browser.$('#email');
    }

    public get passwordField() {
        return this.browser.$('#password')
    }
    public get submitButton() {
        return this.browser.$('[data-testid=login-submit]:nth-child(2)')
    }

    async goTo(url:string){
        await this.browser.maximizeWindow()
        await this.browser.url(url)
    }

    async supportLogin(email: string, password: string) {
        const emailField = await this.emailField;
        const passwordField =  await this.passwordField;
        const submitButton = await this.submitButton;
        await (emailField).waitForStable();
        await (emailField).setValue(email);
        await (passwordField).setValue(password);
        await (submitButton).click();
    }
}

export { WebLoginPage };