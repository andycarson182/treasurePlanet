import { CommonPageElements } from "./commonPageElements";

class ZonesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewZoneButton() {
        return this.browser.$('[data-testid=create-zone-button]');
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-zone-settings-quick-filter-any-input-input]');
    }

    public get editButton() {
        return this.browser.$('[data-testid=edit-modal-button]');
    }

    public get NoResultsLabel() {
        return this.browser.$('[data-testid=data-table-zone-settings-noResults]');
    }

    public getZonesTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-zone-settings-cell-${1 - row}_${cellType}]`);
    }
    
    public get pickingUoMRestrictionOption() {
        return this.browser.$(`li.MuiAutocomplete-option`)

    }
    /*  Add New Equpment Modal Fields*/

    public get zoneCodeField() {
        return this.browser.$('[data-testid="zone-code"]');
    }

    public get zoneNameField() {
        return this.browser.$('[data-testid=zone-name]');
    }

    public get zoneDescriptionField() {
        return this.browser.$('[data-testid=zone-description]');
    }

    public get pickingUoMRestrictionsTypeAhead() {
        return this.browser.$('[data-testid=unit-of-measure-autocomplete]');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        await this.browser.pause(2000); //UI delay
        const cellElement = await this.getZonesTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }

    async selectPickingUoMRestrictions(option: string) {
        await this.commonPageElements.fillInField(await this.pickingUoMRestrictionsTypeAhead, option);
        const pickingUoMRestrictionsOption = await this.pickingUoMRestrictionOption;
        pickingUoMRestrictionsOption.click();
        await this.browser.pause(4000);// UI delay
    }
}

export { ZonesPage };
