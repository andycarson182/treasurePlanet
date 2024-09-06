import { CommonPageElements } from "../commonPageElements";

class EquipmentModelsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewModelButton() {
        return this.browser.$('[data-testid=create-equipment-model-button]');  
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-EquipmentModelSettings-noResults]');
    }

    public getEquipmentModelsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-EquipmentModelSettings-cell-${row - 1 }_${cellType}]`);
    }

    /*  Add New Equipment Model Fields*/

    public get equipmentModelEquipmentTypeDropdown() {
        return this.browser.$('[data-testid=equipment-typeId]');
    }

    public get equipmentModelCodeField() {
        return this.browser.$('[data-testid=equipment-model-code]');
    }

    public get equipmentModelLabelField() {
        return this.browser.$('[data-testid=equipment-model-label]');
    }

    public get equipmentModelDescription() {
        return this.browser.$('[data-testid=equipment-model-description]');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getEquipmentModelsTableCell(row, cellType);
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

export { EquipmentModelsPage };
