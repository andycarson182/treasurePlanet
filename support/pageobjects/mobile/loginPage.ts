class LoginPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get signInButton() {
        return this.browser.$('//*[@content-desc="Sign In"]');
    }

    public get emailField() {
        return this.browser.$('//*[@resource-id="i0116"]');
    };

    public get passwordField() {
        return this.browser.$('//*[@resource-id="i0118"]');
    }

    public get nextButton() {
        return this.browser.$('//*[@resource-id="idSIButton9"]');
    }

    public get submitButton() {
        return this.browser.$('[data-testid=login-submit]:nth-child(2)')
    }

    async signIn(email: string, password: string) {
        const signInButton = await this.signInButton;
        const emailField = await this.emailField;
        const nextButton = await this.nextButton;
        const passwordField = await this.passwordField;
        await (signInButton).click();
        await (emailField).setValue(email);
        await (nextButton).click();
        await (passwordField).setValue(password);
        await (nextButton).click();
        await this.browser.pause(5000);
        await this.browser.keys(['\uE007']);
        await this.browser.keys(['\uE007']);
    }

}

export { LoginPage };