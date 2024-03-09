class CommonPageElements {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get emailField() {
        return this.browser.$('#email');
    }

    public get backButton() {
        return this.browser.$('[data-testid=page-info-back-button]');
    }

    public get spinningWheel() {
        return this.browser.$('#root > div > div > div > div.MuiBox-root.css-1um18wk > div > div > div > span.MuiCircularProgress-root.MuiCircularProgress-indeterminate.MuiCircularProgress-colorPrimary.css-kd40ue > svg > circle')
    }

    public get sectionHeader() {
        return this.browser.$('[data-test-id=page-info-title]')
    }

    public get sectionSubHeader() {
        return this.browser.$('[data-test-id=page-info-subtitle]')
    }

    public get taskSection() {
        return this.browser.$('a[href="/w/ab8d02d6/tasks"]');
    }

    public get inventorySection() {
        return this.browser.$('a[data-testid="sidebar-link-inventory"]');
    }

    public get wmsSection() {
        return this.browser.$('#root > div.MuiBox-root.css-144k634 > div.MuiBox-root.css-t0abzf > div.MuiBox-root.css-0 > div:nth-child(1) > svg')
    }

    public get settingsSection() {
        return this.browser.$('a[data-testid=sidebar-link-settings]');
    }

    public get dataTableHeaderCells() {
        return this.browser.$$('.css-bs5mk4')
    }

    public get requiredFieldErrorMessage() {
        return this.browser.$$('.MuiFormHelperText-contained');
    }

    public get refreshTableButton(){
        return this.browser.$('[data-testid=RefreshIcon]');
    }

    public get sidebarFulfilldLogo(){
        return this.browser.$('[data-testid="sidebar-fulfilld-logo"]');
    }

    /*   Modal elements  */
    public get modalContainer(){
        return this.browser.$('.MuiBox-root.css-1mctkwx');
    }

    public get modalNextButton() {
        return this.browser.$('[data-testid="modal-next-button"]');
    }

    public get modalCancelButton() {
        return this.browser.$('[data-testid=modal-cancel-button]');
    }

    public get modalBackButton() {
        return this.browser.$('[data-testid=modal-back-button]');
    }

    public get modalSubmitButton() {
        return this.browser.$('[data-testid=modal-submit-button]');
    }

    public get modalDeleteButton() {
        return this.browser.$('[data-testid=modal-delete-button]');
    }

    public get modalCloseButton(){
        return this.browser.$('.css-13kleg4');
    }

    async elementIsEnabled(element: any, enabled = false) {

        const ariaDisabledValue = await element.getAttribute('aria-disabled');
        if (enabled == true) {
            expect(ariaDisabledValue).toEqual('false');

        } else {
            expect(ariaDisabledValue).toEqual('true');

        }
    }

    async clickElement(element: WebdriverIO.Element) {
        await (element).waitForStable({ timeout: 15000 });
        await (element).isDisplayed();
        await (element).click();
    }

    async fillInField(fieldName: WebdriverIO.Element, value: string) {
        const field = fieldName;
        await field.setValue(value);
    }

    /* For some reason the WebdriverIo clearValue function is not working with our input fields so this is a workaround.*/
    async clearValue(element: WebdriverIO.Element) {
        await element.click()
        await this.browser.keys(['Meta', 'a']);
        await this.browser.keys(['Backspace']);
    }

    async selectDropdownOption(dropdownElement:WebdriverIO.Element, option:string ){
        await dropdownElement.selectByVisibleText(option);
    }

    async fillFilterOnTerm(filterInput: WebdriverIO.Element, option: string) {
        await filterInput.waitForClickable({ timeout: 10000 });
        await this.clearValue(filterInput);
        await filterInput.setValue(option);
        await this.browser.keys("\uE007");
        await this.browser.pause(2000);
    }
    
    async compareExpectedArrayToActualArrayByAttribute(expectedArray: string[], actualArray: string[], attribute: string) {
        await actualArray.forEach(cycleElements);
        async function cycleElements(value: any, index: any) {
            const actualText = await value.getAttribute(attribute);
            const expectedText = expectedArray[index];
            console.log("expected: ", expectedText, "actual: ", actualText);
            expect(actualText).toEqual(expectedText);
        };

    }

    async checkDataTableHeaderCells(expectedCells: string[]) {
        await this.browser.pause(2000); // UI delay
        const headerCells: any = await this.dataTableHeaderCells;
        await this.compareExpectedArrayToActualArrayByAttribute(expectedCells, headerCells, "title");
    }

    async checkRequiredErrorMessages(expectedErrorMessages: string[]) {
        await this.browser.pause(2000); // UI delay
        let requiredErrorMessages = await this.requiredFieldErrorMessage;

        if (requiredErrorMessages.length !== expectedErrorMessages.length) {
            throw new Error('Number of error messages does not match');
        }
        for (let i = 0; i < expectedErrorMessages.length; i++) {
            const errorMessageText = await requiredErrorMessages[i].getText();
            expect(errorMessageText).toEqual(expectedErrorMessages[i]);
        }
    }
}

export { CommonPageElements };