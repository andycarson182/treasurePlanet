import { CommonPageElements } from "./commonPageElements";

class BinSizesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewBinSizeButton() {
        return this.browser.$('[data-testid=create-binSize-button]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-BinSizes-quick-filter-any-input-input]');
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-BinSizes-noResults]');
    }

    public getBinsSizeTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-BinSizes-cell-${1 - row}_${cellType}]`);
    }

    /*  Add New Bin Size Modal Fields*/

    public get binSizeCodeField() {
        return this.browser.$('[data-testid=bin-size-code]');
    }

    public get binSizeLabelField() {
        return this.browser.$('[data-testid=bin-size-label]');
    }

    public get binSizeDescriptionField() {
        return this.browser.$('[data-testid=bin-size-description]');
    }

    public get binSizeWeightUoMTypeAHead() {
        return this.browser.$('[data-testid=bin-size-weightUomDropdown]');
    }
    public get binSizeWeightCapacityField() {
        return this.browser.$('[data-testid=bin-size-weightCapacity]');
    }

    public get binSizeDimensionUoMTypeAHead() {
        return this.browser.$('[data-testid=bin-size-distanceUomDropdown]');
    }

    public get binSizeDepthField() {
        return this.browser.$('[data-testid=bin-size-depth]');
    }

    public get binSizeWidthField() {
        return this.browser.$('[data-testid=bin-size-width]');
    }

    public get binSizeHeightField() {
        return this.browser.$('[data-testid=bin-size-height]');
    }

    public get binSizeVolumeUoMDropdown() {
        return this.browser.$('[data-testid=bin-size-volumeUomDropdown]');
    }

    public get binSizeVolumeField() {
        return this.browser.$('[data-testid=bin-size-volume]');
    }

    public get productLengthLimitField(){
        return this.browser.$('[data-testid=bin-size-productLengthLimit]')
    }


    public get productWidthLimitField(){
        return this.browser.$('[data-testid=bin-size-productWidthLimit]')
    }


    public get productHeightLimitField(){
        return this.browser.$('[data-testid=bin-size-productHeightLimit]')
    }


    public get productLimitUoMTypeAHead(){
        return this.browser.$('[data-testid=bin-size-distanceUomDropdown]')
    }

    /* Actions */

    async selectWeightUoM(weightUoMOption: string) {
        await this.commonPageElements.fillInField(await this.binSizeWeightUoMTypeAHead, weightUoMOption);
        const listedOption = await this.browser.$(`//li[contains(text(),'${weightUoMOption}')]`);
        await listedOption.click();
    }

    async selectDimensionUoMOption(dimensionUoMOption: string) {
        await this.commonPageElements.fillInField(await this.binSizeDimensionUoMTypeAHead, dimensionUoMOption);
        const listedOption = await this.browser.$(`//li[contains(text(),'${dimensionUoMOption}')]`);
        await listedOption.click();
    }

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getBinsSizeTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { BinSizesPage };