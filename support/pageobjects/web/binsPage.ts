import { CommonPageElements } from "./commonPageElements";

class BinsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewBinButton() {
        return this.browser.$('[data-testid=create-bin-button]');
    }

    public get filterOnTermInput(){
        return this.browser.$('[data-testid=data-table-bin-settings-quick-filter-any-input-input]');
    }

    public get editButton(){
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel(){
        return this.browser.$('[data-testid="data-table-bin-settings-noResults"]');
    }

    public getBinsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-bin-settings-cell-${1 - row}_${cellType}]`);
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
        return this.browser.$('[data-testid=bins-aisle]');
    }

    public get binsColumnField() {
        return this.browser.$('[data-testid=bins-column]');
    }

    public get binsLevelField() {
        return this.browser.$('[data-testid=bins-level]');
    }

    public get binsXField() {
        return this.browser.$('[data-testid=bins-x]');
    }

    public get binsYField() {
        return this.browser.$('[data-testid=bins-y]');
    }

    public get lastCountDateField() {
        return this.browser.$('[data-testid=date-time-picker]');
    }


    /* Actions */

    async selectBinSizeCode(binSizeOption: string) {
        await this.commonPageElements.fillInField(await this.binSizeCodeField, binSizeOption);
        const listedOption = await this.browser.$(`//*[text()='${binSizeOption}']`);
        await listedOption.click();
    }

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        await this.browser.pause(2000); //UI delay
        const cellElement = await this.getBinsTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { BinsPage };