class TaskDetailsPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get taskDetailsEditButton() {
        return this.browser.$('[data-testid=EditIcon]');
    }

    //Edit Task Details Modal

    public get taskDetailsTeamDropdown() {
        return this.browser.$('[data-testid=task-team]');
    }

    public get taskDetailsDueDateField() {
        return this.browser.$('[data-testid=date-picker]');
    }

    public get taskDetailsSourceLotTypeahead() {
        return this.browser.$('[data-testid=sourceLot]');
    }

    public get taskDetailsDestinationLotTypeahead() {
        return this.browser.$('[data-testid=destinationLot]');
    }

    public get taskDetailsSourceBinTypeahead() {
        return this.browser.$('[data-testid=sourceBin]');
    }

    public get taskDetailsDestinationBinTypeahead() {
        return this.browser.$('[data-testid=destinationBin]');
    }
}

export { TaskDetailsPage };