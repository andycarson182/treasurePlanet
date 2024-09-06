import { CommonPageElements } from "../commonPageElements";

class BinsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get actionsButton(){
        return this.browser.$('[data-testid=binsActions_button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid="data-table-BinSettings-noResults"]');
    }

    public getBinsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-BinSettings-cell-${1 - row}_${cellType}]`);
    }

    /*  Add New Bin Modal Fields*/

    public get binSizeCodeField() {
        return this.browser.$('[data-testid=bin-size-dropdown-input]');
    }

    public get binSizeLabelField() {
        return this.browser.$('[data-testid=bin-size-label-input]');
    }

    public get binSizeDescriptionField() {
        return this.browser.$('[data-testid=bin-size-description-input]');
    }

    public get binSizeWeightField() {
        return this.browser.$('[data-testid=bin-size-weight-capacity-input]');
    }

    public get binSizeDepthField() {
        return this.browser.$('[data-testid=bin-size-depth-input]');
    }

    public get binSizeWidthField() {
        return this.browser.$('[data-testid=bin-size-width-input]');
    }


    public get binSizeHeightField() {
        return this.browser.$('[data-testid=bin-size-height-input]');
    }

    public get binCodeField() {
        return this.browser.$('[data-testid=bin-code]');
    }

    public get binAreaDropdown() {
        return this.browser.$('[data-testid=bin-area]');
    }

    public get binAisleField() {
        return this.browser.$('[data-testid=aisle-autocomplete]');
    }

    public get binColumnField() {
        return this.browser.$('[data-testid=aisle-column-autocomplete]');
    }

    public get binLevelField() {
        return this.browser.$('[data-testid=bins-level]');
    }

    public get binXField() {
        return this.browser.$('[data-testid=bins-x]');
    }

    public get binYField() {
        return this.browser.$('[data-testid=bins-y]');
    }

    public get lastCountDateField() {
        return this.browser.$('[data-testid=date-time-picker]');
    }

    /* Actions */

    async selectBinSizeCode(binSizeOption: string) {
        await this.commonPageElements.fillInField(await this.binSizeCodeField, binSizeOption);
        const listedOption = await this.browser.$(`//li[contains(text(),'${binSizeOption}')]`);
        await listedOption.click();
    }

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getBinsTableCell(row, cellType);
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        await browser.waitUntil(
            async () => {
                const cellText = await cellElement.getText();
                return cellText === expectedText;
            },
            {
                timeout: 10000,
                timeoutMsg: `Expected text '${expectedText}' did not match the actual text within 10 seconds`,
            }
        );
        const cellText = await cellElement.getText();
        expect(cellText).toEqual(expectedText);
    }

    
    async selectActionInMenuOption(actionOption: string) {
        const actionOptionsMap: { [key: string]: string } = {
            'Add New Bin': '[data-testid="actionItem_createBin"]',
            'Edit Team Info': '[data-testid="actionItem_addBinTags"]'
        };
    
        if (!(actionOption in actionOptionsMap)) {
            throw new Error("Not selecting a valid action");
        }
    
        const actionButton = await this.actionsButton;
        await actionButton.click();
    
        const actionSelector = actionOptionsMap[actionOption];
        const actionElement = await this.browser.$(actionSelector);
        await actionElement.click();
    }
}

export { BinsPage };