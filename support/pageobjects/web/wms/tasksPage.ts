class TasksPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get fromDateRangeInput() {
        return this.browser.$('[data-testid=date-range-picker-from]');
    }

    public get toDateRangeInput() {
        return this.browser.$('[data-testid=date-range-picker-to]');
    }

    public get clearDateRangeButton() {
        return this.browser.$('.MuiDialogActions-spacing.css-1vskg8q > button:nth-child(1)');
    }

    public getTaskCell(row: any, cellType: string) {
        return this.browser.$(`[data-table-TaskList-cell-${1 - row}_${cellType}]`);
    }
    
    async checkExpectedTaskTypeIs(row: number, expectedTaskType: string) {
        const taskTypeElement = await this.getTaskCell(row,'taskStatus');
        await ( taskTypeElement).scrollIntoView();
        await ( taskTypeElement).isDisplayed();
        await browser.waitUntil(
            async () => {
                const taskTypeName = await(taskTypeElement).getText();
                return taskTypeName === expectedTaskType;
            },
            {
                timeout: 10000,
                timeoutMsg: `Expected text '${expectedTaskType}' did not match the actual text within 10 seconds`,
            }
        );
        const taskTypeName = await(taskTypeElement).getText();
        expect(taskTypeName ).toEqual(expectedTaskType);

    }

    async checkExpectedTaskStatusIs(row: number, expectedTaskStatus: string) {
        const taskStatusElement = await this.getTaskCell(row,'taskStatus');
        await (taskStatusElement).scrollIntoView();
        await (taskStatusElement).isDisplayed();
        await browser.waitUntil(
            async () => {
                const taskStatusName = await(taskStatusElement).getText();
                return taskStatusName === expectedTaskStatus;
            },
            {
                timeout: 10000,
                timeoutMsg: `Expected text '${expectedTaskStatus}' did not match the actual text within 10 seconds`,
            }
        );
        const taskStatusName = await(taskStatusElement).getText();
        expect(taskStatusName ).toEqual(expectedTaskStatus);
    }
}

export { TasksPage };