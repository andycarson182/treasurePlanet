import { CommonPageElements } from "./commonPageElements";

class EquipmentPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewEquipmentButton() {
        return this.browser.$('[data-testid=create-equipment-button]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-EquipmentSettings-quick-filter-any-input-input]');
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel() {
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
        return this.browser.$('[data-testid=equipment-typeId]');
    }

    public get equipmentModelDropdown() {
        return this.browser.$('[data-testid=equipment-modelId]');
    }

    public get equipmentTagIdField() {
        return this.browser.$('[data-testid=equipment-tagId]');
    }


    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEquipmentTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { EquipmentPage };