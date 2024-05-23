class TasksPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get filterOnTermField() {
        return this.browser.$('input[data-testid=data-table-global-task-list-quick-filter-any-input-input]');
    }

    public getTaskStatus(row: number) {
        return this.browser.$(`[data-testid=data-table-global-task-list-cell-${row - 1}_taskStatus]`);
        
    }

    public getTaskType(row: number) {
        return this.browser.$(`[data-testid=data-table-global-task-list-cell-${row - 1}_taskType]`);
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
}

export { TasksPage };