class InventoryPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public getInventoryTab(tabOption: string) {
        return this.browser.$(`//*[text()='${tabOption}']`)
    }

    public get filterByColumnInput() {
        return this.browser.$('input[data-testid=data-table-inventory-bin-level-quick-filter-filter-column-input]');
    }

    public get filterOnNumberInput() {
        return this.browser.$('[data-testid=data-table-inventory-bin-level-quick-filter-number-input]');
    }

    public get arrowDropdown() {
        return this.browser.$('[data-testid=ArrowDropDownIcon]');
    }

    public get currentInventoryActionsButton() {
        return this.browser.$("[data-testid='binLevelActions_button']");
    }
    public get inventoryCountingActionsButton() {
        return this.browser.$("button[data-testid=countTaskActions_button]");
    }
    public get inventoryCountingActionsButtonOptions() {
        return this.browser.$$("div.MuiListItemText-root span");
    }

    public get columnsControlButton() {
        return this.browser.$('[data-testid=data-table-inventory-bin-level-column-control-button]');
    }

    public get filterButton() {
        return this.browser.$('[data-testid=FilterListIcon]');
    }

    public get exportButton() {
        return this.browser.$('[data-testid=data-table-inventory-bin-level-export-button]');
    }

    public get saveLayoutButton() {
        return this.browser.$('[data-testid=data-table-inventory-bin-level-save-layout-button]');
    }

    public get dataTableHeaderCells() {
        return this.browser.$$('.css-bs5mk4')
    }
    public get modalHeader() {
        return this.browser.$('div.MuiDialog-container h2');
    }

    public get modalSubmitButton() {
        return this.browser.$('[data-testid=modal-submit-button]');
    }

    public get snackbarMessage() {
        return this.browser.$('[data-testid=snackbar-notif-success-message]');
    }

    public get licensePlateFilterInput() {
        return this.browser.$("//input[@data-testid='data-table-inventory-license-plate-level-quick-filter-any-input-input']");
    }

    public get firstElementOfTheTable() {
        return this.browser.$(`//tr[1]/td[2]//a`);
    }

    public get binLevelDropdownButton() {
        return this.browser.$("//div[@data-testid= 'dataTableLayoutDropdown-inventory-bin-level']");
    }

    public get nextPageTableBottom() {
        return this.browser.$("//button[@data-testid='data-table-inventory-counting-bins-goto-next-page']");
    }

    async selectInventoryTab(tabOption: string) {
        (await this.getInventoryTab(tabOption)).waitForClickable({ timeout: 10000 });
        (await this.getInventoryTab(tabOption)).click();
    }

    async selectFilterByColumn(filterOption: string) {
        await this.filterByColumnInput.scrollIntoView();
        (await this.arrowDropdown).waitForClickable({ timeout: 10000 });
        (await this.arrowDropdown).click()
        const dropdownListElement = await browser.$(`//li[contains(text(), '${filterOption}')]`);
        await dropdownListElement.click();
    }

    async selectOptionInInventoryLevelMenu(option: string) {
        let currentOption = await this.browser.$(`//div[@data-testid='dataTableLayoutDropdown-inventory-bin-level-menu']/div[contains(@class,'MuiPaper-elevation8')]/ul//li[contains(text(), '${option}')]`)
        await (currentOption).waitForStable({ timeout: 3000 });
        await (currentOption).click();
    }

    async fillLicensePlateFilter(option: string) {
        let licensePlateFilterInputElement = await this.licensePlateFilterInput;
        await (licensePlateFilterInputElement).waitForClickable({ timeout: 10000 })
        await (licensePlateFilterInputElement).click()
        await (licensePlateFilterInputElement).setValue(option);
        await this.browser.keys("\uE007");
        await this.browser.pause(2000);
    }

    async selectFirstElemenOfTheTable() {
        const firstElementOfTheTable = await this.firstElementOfTheTable;
        await (firstElementOfTheTable).scrollIntoView()
        await (firstElementOfTheTable).waitForClickable({ timeout: 10000 })
        await (firstElementOfTheTable).click()
    }

    async compareExpectedArrayToActualArray(expectedArray: string[], actualArray: string[]) {
        await actualArray.forEach(cycleElements);
        async function cycleElements(value: any, index: any) {
            const actualText = await value.getText();
            const expectedText = expectedArray[index];
            console.log("expected: ", expectedText, "actual: ", actualText);
            expect(actualText).toEqual(expectedText);
        };

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

    async checkInventoryCountingActionButtonOptions(expectedArray: string[]) {
        const actualArray: any = await this.inventoryCountingActionsButtonOptions;
        await this.compareExpectedArrayToActualArray(expectedArray, actualArray);
    }

    async clickBinLevelDropdownButton() {
        await this.binLevelDropdownButton.waitForClickable({ timeout: 5000 });
        await this.binLevelDropdownButton.click();
    }
}

export { InventoryPage };