import { CommonPageElements } from "../commonPageElements";

class EquipmentTypesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewTypeButton() {
        return this.browser.$('[data-testid=create-equipment-type-button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-EquipmentTypeSettings-noResults]');
    }

    public getEquipmentTypesTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-EquipmentTypeSettings-cell-${row - 1}_${cellType}]`);
    }

    /*  Add New Equipment Type Fields*/

    public get equipmentTypeCodeField() {
        return this.browser.$('[data-testid=equipment-type-code]');
    }

    public get equipmentTypeLabelField() {
        return this.browser.$('[data-testid=equipment-type-label]');
    }

    public get equipmentTypeDescriptionField() {
        return this.browser.$('[data-testid=equipment-type-description]');
    }

    public get equipmentTypeMobilityDropdown() {
        return this.browser.$('[data-testid=equipment-type-mobility]');
    }

    public get equipmentTypeCostPerHourField() {
        return this.browser.$('[data-testid=equipment-type-cost]');
    }

    public get equipmentTypeWeightLimitField() {
        return this.browser.$('[data-testid=equipment-type-weightMax]');
    }
    public get equipmentTypeWeightUoMDropdown() {
        return this.browser.$('[data-testid=equipment-type-weight-uom-weightUomDropdown]');
    }
    public get equipmentTypeHeightLimitField() {
        return this.browser.$('[data-testid=equipment-type-heightMax]');
    }
    public get equipmentTypeHeightUoMDropdown() {
        return this.browser.$('[data-testid=equipment-type-height-uom-distanceUomDropdown]');
    }
    public get equipmentTypeHeightMinimumField() {
        return this.browser.$('[data-testid=equipment-type-heightMin]');
    }
    public get equipmentTypeVolumeLimitField() {
        return this.browser.$('[data-testid=equipment-type-volumeMax]');
    }
    public get equipmentTypeVolumeUoMDropdown() {
        return this.browser.$('[data-testid=equipment-type-volume-uom-volumeUomDropdown]');
    }
    public get equipmentTypeAverageOperatingSpeedField() {
        return this.browser.$('[data-testid=equipment-type-velocity]');
    }
    public get equipmentTypeSpeedUoMDropdown() {
        return this.browser.$('[data-testid=equipment-type-velocity-uom-velocityUomDropdown]');
    }
    public get equipmentTypeVerticalSpeedField() {
        return this.browser.$('[data-testid=equipment-type-verticleSpeed]');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEquipmentTypesTableCell(row, cellType);
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

export { EquipmentTypesPage };
