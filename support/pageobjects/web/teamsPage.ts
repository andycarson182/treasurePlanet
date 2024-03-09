import { CommonPageElements } from "./commonPageElements";

class TeamsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get actionsButton() {
        return this.browser.$('[data-testid=teamActions_button]');
    }

    public get teamNameField() {
        return this.browser.$('[data-testid=team-name]');
    }

    public get statusField() {
        return this.browser.$('#team-status-autocomplete');
    }
    public get teamDescriptionField() {
        return this.browser.$('[data-testid=team-description]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-team-settings-quick-filter-any-input-input]');
    }

    public get filterOnTermInputForManageUserModal() {
        return this.browser.$('[data-testid=data-table-team-assign-users-quick-filter-any-input-input]');
    }
    
    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-global-task-list-noResults]');
    }

    // public getModalButton(name: string) {
    //     return this.browser.$(`[data-testid="modal-${name}-button"]`);  //improvement once the attribute name will be fixed
    // }

    public getActionOption(actionOption: number) {
        return this.browser.$(`#team-action-menu  ul > li:nth-child(${actionOption})`)
    }

    public getStatusOption(statusOption: number) {
        return this.browser.$(`li#team-status-autocomplete-option-${statusOption}`)
    }

    public getTeamsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-team-settings-cell-${1 - row}_${cellType}]`);
    }

    public getAssignUsersTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-team-assign-users-cell-${1 - row}_${cellType}]`);
    }

    /* Actions */


    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        await this.browser.pause(5000);
        const cellElement = await this.getTeamsTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }

    async selectCheckbox(row: number, cellType: string) {
        if (cellType === 'teams') {
            const cellElement = await this.getTeamsTableCell(row, 'selection');
            await cellElement.click();
        } else if (cellType === 'assign user') {
            const cellElement = await this.getAssignUsersTableCell(row, 'selection');
            await cellElement.click();
        } else {
            throw new Error('Invalid cell type');
        }
    }

    async selectActioninMenuOption(actionOption: string) {
        const actionOptionsMap: { [key: string]: number } = {
            'Add New Team': 1,
            'Edit Team Info': 2,
            'Assign Users to Team': 3,
            'Edit Task Filter': 4,
            'Delete Team': 5
        };

        if (!(actionOption in actionOptionsMap)) {
            throw new Error("Not selecting a valid action");
        }

        const actionButton = await this.actionsButton;
        await actionButton.click();
        const optionIndex = actionOptionsMap[actionOption];
        const actionElement = await this.getActionOption(optionIndex);
        await actionElement.click();
    }


    async selectStatus(status: string) {
        const statusField = await this.statusField;
        statusField.click();

        const statusIndexMap: { [key: string]: number } = {
            'Active': 0,
            'Inactive': 1
        };

        if (status in statusIndexMap) {
            const statusOption = await this.getStatusOption(statusIndexMap[status]);
            await statusOption.click();
        } else {
            throw new Error("Not accepted status");
        }
    }

    async fillInTeamName(teamName: string) {
        const teamNameField = await this.teamNameField;
        await this.commonPageElements.clearValue(teamNameField);
        await teamNameField.setValue(teamName);
    }

    async fillInTeamDescription(teamDescription: string) {
        const teamDescriptionField = await this.teamDescriptionField;
        await this.commonPageElements.clearValue(teamDescriptionField);
        await teamDescriptionField.setValue(teamDescription);
    }
}

export { TeamsPage };