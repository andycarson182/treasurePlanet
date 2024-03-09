class LicensePlateDetailPage {

    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public async getDestinationBin(row: number) {
        return await this.browser.$(`[data-testid="data-table-license-plate-details-tasks-cell-${row - 1}_destinationBinCode"]`).getText();
    }

    public getTaskStatus(row: number) {
        return this.browser.$(`[data-testid="data-table-license-plate-details-tasks-cell-${row - 1}_taskStatus"]`);
    }

    public getTaskType(row: number) {
        return this.browser.$(`[data-testid="data-table-license-plate-details-tasks-cell-${row - 1}_taskType"]`);
    }

    public async getCellOnLicensePlateTasksTable(row: number, column: number) {
        return await this.browser.$(`//tbody[@data-testid='data-table-license-plate-details-tasks-table-body']/tr[${row}]/td[${column}]`);
    }

    async checkExpectedTaskTypeIs(row: number, expectedTaskType: string) {
        await this.browser.pause(5000);
        const taskTypeElement = await this.getTaskType(row);
        const taskTypeName = await(taskTypeElement).getText();
        await (taskTypeElement).scrollIntoView();
        await (taskTypeElement).isDisplayed();
        expect(taskTypeName).toEqual(expectedTaskType);
    }

    async checkExpectedTaskStatusIs(row: number, expectedTaskStatus: string) {
        const taskStatusElement = await this.getTaskStatus(row);
        const taskStatusName = await(taskStatusElement).getText();
        await (taskStatusElement).scrollIntoView();
        await (taskStatusElement).isDisplayed();
        expect(taskStatusName).toEqual(expectedTaskStatus);
    }

    async expectGivenLicensePlateTaskCellTohaveGivenText(row: number, column: number, expectedText: string) {

        (await this.getCellOnLicensePlateTasksTable(row, column)).waitForDisplayed({ timeout: 15000 });
        (await this.getCellOnLicensePlateTasksTable(row, column)).scrollIntoView();
        let actualText = (await this.getCellOnLicensePlateTasksTable(row, column)).getText();
        await expect(await actualText).toEqual(expectedText);
    }

    async checkExpectedCellTaskStatusIs(row: number, column: number, expectedTaskStatus: string) {
        await this.expectGivenLicensePlateTaskCellTohaveGivenText(row, column, expectedTaskStatus);
    }
}


export { LicensePlateDetailPage };