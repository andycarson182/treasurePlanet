import { CommonPageElements } from "./commonPageElements";

class IntegrationLogsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-IntegrationLogs-quick-filter-any-input-input]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-IntegrationLogs-noResults]');
    }

    public getIntegrationLogsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-IntegrationLogs-cell-${1 - row}_${cellType}]`);
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getIntegrationLogsTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { IntegrationLogsPage };
