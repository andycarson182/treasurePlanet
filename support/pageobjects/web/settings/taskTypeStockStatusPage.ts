import { CommonPageElements } from "../commonPageElements";

class TaskTypesStockStatusPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-TaskTypesStockStatusMappings-noResults]');
    }

    public getTaskTypesStockStatusTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-TaskTypesStockStatusMappings-cell-${1 - row}_${cellType}]`);
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getTaskTypesStockStatusTableCell(row, cellType);
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

export { TaskTypesStockStatusPage };
