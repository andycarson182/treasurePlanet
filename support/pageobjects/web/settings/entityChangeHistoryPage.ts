import { CommonPageElements } from "../commonPageElements";

class EntityChangeHistoryPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-EntityChangeHistory-noResults]');
    }

    public getEntityChangeHistoryTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-EntityChangeHistory-cell-${1 - row}_${cellType}]`);
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEntityChangeHistoryTableCell(row, cellType);
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

export { EntityChangeHistoryPage };
