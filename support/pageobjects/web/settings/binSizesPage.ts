import { CommonPageElements } from "../commonPageElements";

class BinSizesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewBinSizeButton() {
        return this.browser.$('[data-testid=create-binSize-button]');
    }
    
    public get noResultsLabel() {
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

    //BUG:https://fulfilld.atlassian.net/browse/DEV-4127
    public get noProductSizeRestrictionRadioButton(){
        return this.browser.$(' label:nth-child(1) > span.MuiButtonBase-root.MuiRadio-root.MuiRadio-colorPrimary.PrivateSwitchBase-root.MuiRadio-root.MuiRadio-colorPrimary.MuiRadio-root.MuiRadio-colorPrimary.css-1nfvfi2 > input')
    }

    //BUG:https://fulfilld.atlassian.net/browse/DEV-4127
    public get setProductSizeRestrictionRadioButton(){
            return this.browser.$(' label:nth-child(2) > span.MuiButtonBase-root.MuiRadio-root.MuiRadio-colorPrimary.PrivateSwitchBase-root.MuiRadio-root.MuiRadio-colorPrimary.MuiRadio-root.MuiRadio-colorPrimary.css-1nfvfi2 > input')
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
}

export { BinSizesPage };