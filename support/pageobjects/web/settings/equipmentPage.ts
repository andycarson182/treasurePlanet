import { CommonPageElements } from "../commonPageElements";

class EquipmentPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewEquipmentButton() {
        return this.browser.$('[data-testid=create-equipment-button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-EquipmentSettings-noResults]');
    }

    public getEquipmentTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-EquipmentSettings-cell-${row - 1 }_${cellType}]`);
    }

    /*  Add New Equpment Modal Fields*/

    public get equipmentCodeField() {
        return this.browser.$('[data-testid="equipment-code"]');
    }

    public get equipmentLabelField() {
        return this.browser.$('[data-testid=equipment-label]');
    }

    public get equipmentDescriptionField() {
        return this.browser.$('[data-testid=equipment-desc]');
    }

    public get equipmentStatusDropdown() {
        return this.browser.$('[data-testid=equipment-status]');
    }

    public get equipmentTypeDropdown() {
        return this.browser.$('#equipment-typeId'); //there is a testid discrepancie https://fulfilld.atlassian.net/browse/DEV-3584
    }

    public get equipmentModelDropdown() {
        return this.browser.$('#equipment-modelId'); //there is a testid discrepancie https://fulfilld.atlassian.net/browse/DEV-3584
    }

    public get equipmentTagIdField() {
        return this.browser.$('[data-testid=equipment-tagId]');
    }


    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEquipmentTableCell(row, cellType);
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

export { EquipmentPage };