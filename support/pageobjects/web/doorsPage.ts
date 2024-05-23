import { CommonPageElements } from "./commonPageElements";

class DoorsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewDoorButton() {
        return this.browser.$('[data-testid=create-door-button]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-DoorSettings-quick-filter-any-input-input]');
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-DoorSettings-noResults]');
    }

    public getDoorsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-DoorSettings-cell-${1 - row}_${cellType}]`);
    }

    /*  Add New Doors Modal Fields*/

    public get doorCodeField() {
        return this.browser.$('[data-testid=door-code]');
    }

    public get doorAreaDropdown() {
        return this.browser.$('[data-testid=door-areaId]');
    }

    public get doorBinDropdown() {
        return this.browser.$('[data-testid=door-binId]');
    }

    public get doorDirectionDropdown() {
        return this.browser.$('[data-testid=door-direction]');
    }

    public get doorXField() {
        return this.browser.$('[data-testid=doors-x]');
    }

    public get doorYField() {
        return this.browser.$('[data-testid=doors-y]');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getDoorsTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { DoorsPage };