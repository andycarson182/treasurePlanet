import { CommonPageElements } from "../commonPageElements";

class UserAdministrationPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addUserButton() {
        return this.browser.$('[data-testid=page-info-additional-content]'); // needs a test id attribute
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-UserAdminSettings-noResults]');
    }

    public getUserAdministrationTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-UserAdminSettings-cell-${1 - row}_${cellType}]`);
    }

    /*  Add New User Modal Fields*/

    public get firstNameField() {
        return this.browser.$('[data-testid=user-admin-firstName]');
    }

    public get lastNameField() {
        return this.browser.$('[data-testid=user-admin-lastName]');
    }

    public get emailField() {
        return this.browser.$('[data-testid=user-admin-email]');
    }

    public get phoneField() {
        return this.browser.$('[data-testid=user-admin-phone]');
    }

    public get userAssignmentGroupsDropdown() {
        return this.browser.$('[data-testid=user-admin-usergroups-input]');
    }

    public get userActiveCheckbox(){
        return this.browser.$('[name=active]')
    }

    public get chipLabel(){
        return this.browser.$('.MuiChip-label');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getUserAdministrationTableCell(row, cellType);
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

export { UserAdministrationPage };
