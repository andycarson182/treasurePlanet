import { CommonPageElements } from "./commonPageElements";

class AreasPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewAreaButton() {
        return this.browser.$('[data-testid=create-area-button]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid="data-table-AreaSettings-quick-filter-any-input-input"]');
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-table-AreaSettings-noResults]');
    }

    public getAreasTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-AreaSettings-cell-${1 - row}_${cellType}]`);
    }

    /*  Add New Areas Modal Fields*/

    public get areaCodeField() {
        return this.browser.$('[data-testid=area-code]');
    }

    public get areaNameField() {
        return this.browser.$('[data-testid=area-name]');
    }

    public get areaStatusDropdown() {
        return this.browser.$('[data-testid=area-status]');
    }

    public get areaTargetTemperatureField() {
        return this.browser.$('[data-testid=area-target-temperature]');
    }

    public get issueNewStockSwitch() {
        return this.browser.$('[name=exitPoint]');
    }

    public get receiveNewStockSwitch() {
        return this.browser.$('[name=entryPoint]');
    }

    public get areaDescriptionField() {
        return this.browser.$('[data-testid=area-description]');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getAreasTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { AreasPage };