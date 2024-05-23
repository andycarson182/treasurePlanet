import { CommonPageElements } from "./commonPageElements";

class EquipmentTypesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewTypeButton() {
        return this.browser.$('[data-testid=create-equipment-type-button]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-EquipmentTypeSettings-quick-filter-any-input-input]');
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-EquipmentTypeSettings-noResults]');
    }

    public getEquipmentTypesTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-EquipmentTypeSettings-cell-${row - 1}_${cellType}]`);
    }

    /*  Add New Equipment Type Fields*/

    public get equipmentTypeCodeField() {
        return this.browser.$('[data-testid=code]');
    }

    public get equipmentTypeLabelField() {
        return this.browser.$('[data-testid=label]');
    }

    public get equipmentTypeDescriptionField() {
        return this.browser.$('[data-testid=description]');
    }

    public get equipmentTypeMobilityDropdown() {
        return this.browser.$('[data-testid=equipment-mobility]');
    }

    public get equipmentTypeCostPerHourField() {
        return this.browser.$('[data-testid=equipment-cost]');
    }

    public get equipmentTypeWeightLimitField() {
        return this.browser.$('[data-testid=equipment-weightMax]');
    }
    public get equipmentTypeWeightUoMDropdown() {
        return this.browser.$('[data-testid=equipment-weight-uom-weightUomDropdown]');
    }
    public get equipmentTypeHeightLimitField() {
        return this.browser.$('[data-testid=equipment-heightMax]');
    }
    public get equipmentTypeHeightUoMDropdown() {
        return this.browser.$('[data-testid=equipment-height-uom-distanceUomDropdown]');
    }
    public get equipmentTypeHeightMinimumField() {
        return this.browser.$('[data-testid=equipment-heightMin]');
    }
    public get equipmentTypeVolumeLimitField() {
        return this.browser.$('[data-testid=equipment-volumeMax]');
    }
    public get equipmentTypeVolumeUoMDropdown() {
        return this.browser.$('[data-testid=equipment-volume-uom-volumeUomDropdown]');
    }
    public get equipmentTypeSpeedField() {
        return this.browser.$('[data-testid=equipment-velocity]');
    }
    public get equipmentTypeSpeedUoMDropdown() {
        return this.browser.$('[data-testid=equipment-velocity-uom-velocityUomDropdown]');
    }
    public get equipmentTypeVerticalSpeedField() {
        return this.browser.$('[data-testid=equipment-verticleSpeed]');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEquipmentTypesTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { EquipmentTypesPage };
