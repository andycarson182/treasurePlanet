import { CommonPageElements } from "./commonPageElements";

class EntityChangeHistoryPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-EntityChangeHistory-quick-filter-any-input-input]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-EntityChangeHistory-noResults]');
    }

    public getEntityChangeHistoryTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-EntityChangeHistory-cell-${1 - row}_${cellType}]`);
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEntityChangeHistoryTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { EntityChangeHistoryPage };
