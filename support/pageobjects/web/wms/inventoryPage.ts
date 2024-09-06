class InventoryPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public getInventoryTab(tabOption: string) {
        return this.browser.$(`//*[text()='${tabOption}']`)
    }

    public get filterByColumnInput() {
        return this.browser.$('[data-testid=data-table-InventoryBinLevel-quick-filter-filter-column-input]');
    }

    public get filterOnNumberInput() {
        return this.browser.$('[data-testid=data-table-InventoryBinLevel-quick-filter-number-input]');
    }

    public get licensePlateActionsButton() {
        return this.browser.$("[data-testid=licensePlateActions_button]");
    }
    public get inventoryCountingActionsButton() {
        return this.browser.$("button[data-testid=countTaskActions_button]");
    }
    public get inventoryCountingActionsButtonOptions() {
        return this.browser.$$("div.MuiListItemText-root span");
    }

    public get columnsControlButton() {
        return this.browser.$('[data-testid=data-table-InventoryBinLevel-column-control-button]');
    }

    public get filterButton() {
        return this.browser.$('[data-testid=FilterListIcon]');
    }

    public get exportButton() {
        return this.browser.$('[data-testid=data-table-InventoryBinLevel-export-button]');
    }

    public get saveLayoutButton() {
        return this.browser.$('[data-testid=data-table-InventoryBinLevel-save-layout-button]');
    }

    public get licensePlateFilterInput() {
        return this.browser.$("[data-testid=data-table-InventoryLicensePlateLevel-quick-filter-any-input-input]");
    }

    public get binLevelDropdownButton() {
        return this.browser.$("[data-testid=dataTableLayoutDropdown-InventoryBinLevel]");
    }

    public get nextPageTableBottom() {
        return this.browser.$("//button[@data-testid=data-table-inventory-counting-bins-goto-next-page]");
    }

    public get firstCheckbox() {
        return this.browser.$("tr:nth-child(1) > td:nth-child(1) > div > span > input");
    }

    public get inventoryLicencePlateFilterByColumnTypeahead(){
        return this.browser.$('[data-testid=data-table-InventoryLicensePlateLevel-quick-filter-filter-column-input]');
    }

    public get inventoryLicencePlateFilterOnValueDropdown(){
        return this.browser.$('[data-testid=data-table-InventoryLicensePlateLevel-quick-filter-enum-input]');
    }
    public getInventoryLicensePlateTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-InventoryLicensePlateLevel-cell-${1 - row}_${cellType}]`);
    }

    public get licensePlateLevelNoResultsLabel() {
        return this.browser.$('[data-testid=data-table-InventoryLicensePlateLevel-noResults]');
    }


    /* Move License Plate from bin to bin */

    public get destinationBinDropdown() {
        return this.browser.$("[data-testid=destinationBin-input]");
    }

    public get markAsCompleteCheckbox() {
        return this.browser.$(".MuiCheckbox-sizeMedium.css-a9sl58 > input")
    }

    async selectInventoryTab(tabOption: string) {
        (await this.getInventoryTab(tabOption)).waitForClickable({ timeout: 10000 });
        (await this.getInventoryTab(tabOption)).click();
    }

    async selectOptionInInventoryLevelMenu(option: string) {
        let currentOption = await this.browser.$(`//li[@data-testid="dataTableLayoutDropdown-InventoryBinLevel-menu-item"][contains(text(), '${option}')]`)
        await (currentOption).waitForStable({ timeout: 3000 });
        await (currentOption).click();
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
}

export { InventoryPage };