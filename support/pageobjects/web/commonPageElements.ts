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
        return this.browser.$('h2[data-testid="page-info-title"]');
    }

    public get sectionSubHeader() {
        return this.browser.$('[data-test-id=page-info-subtitle]');
    }

    public get wmsSection() {
        return this.browser.$('[data-testid=sidebar-category-wms] + svg');
    }

    public getSidebarLink(section: string) {
        return this.browser.$(`[data-testid=sidebar-link-${section}]`);
    }

    public get dataTableHeaderCells() {
        return this.browser.$$('.css-bs5mk4')
    }

    public get requiredFieldErrorMessage() {
        return this.browser.$$('.MuiFormHelperText-contained');
    }

    public get refreshTableButton() {
        return this.browser.$('[data-testid=RefreshIcon]');
    }

    public get sidebarFulfilldLogo() {
        return this.browser.$('[data-testid="sidebar-fulfilld-logo"]');
    }

    public get firstElementOfTheTable() {
        return this.browser.$(`//tr[1]/td[2]//a`);
    }

    public get filterByColumnArrowDropdown() {
        return this.browser.$('[data-testid=ArrowDropDownIcon]');
    }

    get snackbarSuccessMessage() {
        return this.browser.$('[data-testid=snackbar-notif-success-message]');
    }

    get snackbarErrorMessage() {
        return this.browser.$('[  data-testid=snackbar-notif-error-message]');
    }


    /*   Modal elements  */
    public get modalContainer() {
        return this.browser.$('.MuiBox-root.css-1mctkwx');
    }

    public get modalHeader() {
        return this.browser.$('div.MuiDialog-container h2');
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

    public get modalCloseButton() {
        return this.browser.$('.css-13kleg4');
    }

    public get modalExitButton() {
        return this.browser.$('[data-testid=modal-misc-button]')
    }
    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get typeaheadAutoCompletedOptions() {
        return this.browser.$$(`li.MuiAutocomplete-option`);
    }

    async clickElement(element: WebdriverIO.Element) {
        await (element).waitForClickable({ timeout: 30000 });
        await (element).isDisplayed();
        await (element).click();
    }
    async fillInField(fieldName: WebdriverIO.Element, value: string) {
        const field = fieldName;
        await field.waitForDisplayed();
        await field.clearValue();
        await this.clearValue(field);
        await field.setValue(value);
    }

    /* For some reason the WebdriverIo clearValue function is not working with our input fields so this is a workaround.*/
    async clearValue(element: WebdriverIO.Element) {
        await element.click();
        if (process.platform === 'darwin') {
            // Use Meta + A to select all on macOS
            await this.browser.keys(['Meta', 'a']);
        } else {
            // Use Control + A to select all on other operating systems (e.g., Ubuntu)
            await this.browser.keys(['Control', 'a']);
        }
        await this.browser.keys(['Backspace']);
    }

    // This is for regular dropdown selection
    async selectDropdownOption(dropdownElement: WebdriverIO.Element, option: string) {
        await dropdownElement.selectByVisibleText(option);
    }

    //This is for a custom-styled componen
    async selectCustomDropdownOption(dropdownElement: WebdriverIO.Element, optionText: string) {
        await dropdownElement.click();
        const optionSelector = `//li[contains(text(), "${optionText}")]`;
        const optionElement = await $(optionSelector);
        await optionElement.waitForDisplayed({ timeout: 15000 });
        await optionElement.click();
    }

    // This is for typeahead selection
    async selectTypeaheadOption(dropdownElement: WebdriverIO.Element, option: string) {
        // Fill in the dropdown with the option
        await this.fillInField(dropdownElement, option);

        // Wait until at least one autocomplete option is displayed
        await this.browser.waitUntil(
            async () => {
                const options = await this.typeaheadAutoCompletedOptions;
                return options.length > 0 && options.some(async (el) => await el.isDisplayed());
            },
            {
                timeout: 30000,
                timeoutMsg: `Expected autocomplete options to be displayed but they were not found within the timeout period`
            }
        );

        // Find and click the option that matches the provided text
        const options = await this.typeaheadAutoCompletedOptions;
        for (const optionElement of options) {
            const optionText = await optionElement.getText();
            if (optionText.trim() === option.trim()) { // Ensure it matches exactly
                await optionElement.click();
                await this.browser.pause(2500); // UI delay
                return;
            }
        }

        // If no exact match is found, throw an error
        throw new Error(`No autocomplete option found matching "${option}"`);
    }

    async fillFilterOnTerm(filterInput: WebdriverIO.Element, option: string) {
        await filterInput.waitForClickable({ timeout: 30000 }); // Ensure the element is clickable
        await filterInput.scrollIntoView(); // Scroll the element into view if necessary
        await this.clearValue(filterInput);
        await filterInput.setValue(option);
        await filterInput.click();
        await this.browser.keys("\uE007");
        await this.browser.keys("\uE007"); // Second Enter for UI responsiveness
        const refreshTableButton = await this.refreshTableButton;
        await this.clickElement(refreshTableButton);
    }

    async selectFirstElemenOfTheTable() {
        const firstElementOfTheTable = await this.firstElementOfTheTable;
        await (firstElementOfTheTable).scrollIntoView()
        await (firstElementOfTheTable).waitForClickable({ timeout: 10000 })
        await (firstElementOfTheTable).click()
    }

    async selectActionOption(actionOption: string) {
        const actionElement = await this.browser.$(`//span[text()='${actionOption}']`);
        await actionElement.isClickable();
        await actionElement.click();
    }

    async selectFilterByColumn(filterOption: string) {
        const filterByColumnArrowDropdown = await this.filterByColumnArrowDropdown;
        await filterByColumnArrowDropdown.scrollIntoView();
        await filterByColumnArrowDropdown.waitForClickable({ timeout: 30000 });
        await filterByColumnArrowDropdown.click()
        const dropdownListElement = await this.browser.$(`//li[contains(text(), '${filterOption}')]`);
        await dropdownListElement.click();
    }

    async selectCheckboxOption(option: string) {
        const checkboxOption = await this.browser.$(`tr:nth-child(${option}) > td:nth-child(1) > div > span > input`);
        await checkboxOption.scrollIntoView();
        await checkboxOption.click();
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

    async checkSnackbarMessage(expectedMessage: string, messageType: 'success' | 'error') {
        const snackbarMessageElement = messageType === 'success'
            ? this.snackbarSuccessMessage
            : this.snackbarErrorMessage;

        await browser.waitUntil(
            async () => {
                const actualMessage = await snackbarMessageElement.getText();
                return actualMessage === expectedMessage;
            },
            {
                timeout: 6000, // Adjust timeout as necessary
                timeoutMsg: `Expected snackbar ${messageType} message to be "${expectedMessage}" but it was not found within the timeout period`
            }
        );

        const finalMessage = await snackbarMessageElement.getText();
        expect(finalMessage).toEqual(expectedMessage);
    }

}

export { CommonPageElements };