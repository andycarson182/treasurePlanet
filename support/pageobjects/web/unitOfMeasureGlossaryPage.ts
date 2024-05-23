import { CommonPageElements } from "./commonPageElements";

class UnitOfMeasureGlossaryPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-UnitOfMeasureGlossary-quick-filter-any-input-input]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-UnitOfMeasureGlossary-noResults]');
    }

    public getUnitOfMeasureGlossaryTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-UnitOfMeasureGlossary-cell-${1 - row}_${cellType}]`);
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getUnitOfMeasureGlossaryTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { UnitOfMeasureGlossaryPage };
