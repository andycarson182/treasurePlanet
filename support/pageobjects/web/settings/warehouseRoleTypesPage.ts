import { CommonPageElements } from "../commonPageElements";

class WarehouseRoleTypesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewTypeButton() {
        return this.browser.$('[data-testid=page-info-additional-content]'); // no data test id attribute
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }
    
    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-WarehouseRoleTypeSettings-noResults]');
    }

    public getWarehouseRoleTypesTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-WarehouseRoleTypeSettings-cell-${1 - row}_${cellType}]`);
    }
    /*  create new warehouse role type Modal Fields*/

    public get warehouseRoleTypeCodeField() {
        return this.browser.$('#warehouse-role-type-code'); // no data test id attribute
    }

    public get warehouseRoleTypeLabelField() {
        return this.browser.$('#warehouse-role-type-label'); // no data test id attribute
    }

    public get warehouseRoleTypeDescriptionField() {
        return this.browser.$('#warehouse-role-type-description'); // no data test id attribute
    }

    public get warehouseRoleTypeSpeedField() {
        return this.browser.$('#warehouse-role-type-speed'); // no data test id attribute
    }

    public get warehouseRoleTypeSpeedUoMTypeahead() {
        return this.browser.$('[data-testid=equipment-speed-uom-velocityUomDropdown]');
    }

    public get warehouseRoleTypeCostPerHourField() {
        return this.browser.$('#warehouse-role-type-cost'); // no data test id attribute
    }

    public get warehouseRoleTypeCurrencyField() {
        return this.browser.$('[data-testid=warehouse-role-type-currency]'); // no data test id attribute
    }

    public get warehouseRoleTypeWeightLimitField() {
        return this.browser.$('#warehouse-role-type-weight-limit'); // no data test id attribute
    }

    public get warehouseRoleTypeWeightUoMTypeahead() {
        return this.browser.$('[data-testid=warehouse-role-type-weight-uom-weightUomDropdown]');
    }
    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getWarehouseRoleTypesTableCell(row, cellType);
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

export { WarehouseRoleTypesPage };
