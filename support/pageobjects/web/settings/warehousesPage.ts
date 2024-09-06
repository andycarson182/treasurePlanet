import { CommonPageElements } from "../commonPageElements";

class WarehousesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get selectCompanyDropdown() {
        return this.browser.$('[data-testid=company-select]')
    }

    public get addNewWarehouseButton() {
        return this.browser.$('[data-testid=warehouse-add]');
    }

    /*  Add New Warehouse Modal Fields */

    // Warehouse Details

    public get warehouseLabelField(){
        return this.browser.$('[data-testid=warehouse-name]') //we need to adjust the attribute name
    }
    public get warehouseCodeField() {
        return this.browser.$('[data-testid=warehouse-code]');
    }

    public get warehouseCompanyAssociationDropdown() {
        return this.browser.$('[data-testid=warehouse-company]');
    }

    public get warehouseModelDropdown(){
        return this.browser.$('[data-testid=warehouse-model-type]')
    }

    //Warehouse Contact Information
    public get warehouseEmailField() {
        return this.browser.$('[data-testid=company-email]'); //we need to adjust the attribute name
    }
    public get warehousePhoneField() {
        return this.browser.$('[data-testid=company-phone]');//we need to adjust the attribute name
    }

    public get warehouseStreet1Field() {
        return this.browser.$('[data-testid=company-street1]');//we need to adjust the attribute name
    }

    public get warehouseStreet2Field() {
        return this.browser.$('[data-testid=company-street2]');//we need to adjust the attribute name
    }

    public get warehouseCountryDropdown() {
        return this.browser.$('[data-testid=country-dropdown-input]');//we need to adjust the attribute name
    }

    public get warehouseCityField() {
        return this.browser.$('[data-testid=company-city]');//we need to adjust the attribute name
    }

    public get warehouseStateField() {
        return this.browser.$('input[data-testid=company-state]');//we need to adjust the attribute name
    }

    public get warehouseZipField() {
        return this.browser.$('[data-testid=company-zip]');//we need to adjust the attribute name
    }

    // Warehouse Display Preferences

    public get warehouseCurrencyDropdown() {
        return this.browser.$('[data-testid=displayPref-currency]');
    }
    public get warehouseLanguageDropdown() {
        return this.browser.$('[data-testid=displayPref-language]');
    }
    public get warehouseDateFormatDropdown() {
        return this.browser.$('[data-testid=displayPref-dateFormat]');
    }
    public get warehouseTimeFormatDropdown() {
        return this.browser.$('[data-testid=displayPref-timeFormat]');
    }
    public get warehouseTimeZoneDropdown() {
        return this.browser.$('[data-testid=displayPref-timezone]');
    }

    public get warehouseMeasurementSystemField() {
        return this.browser.$('[data-testid=displayPref-measurementSystem]');
    }

    public get labels() {
        return this.browser.$$('.css-1r8g261');
    }

    /* Actions */

    async getEditButton(section: number) {
        return this.browser.$(`div:nth-child(${section}) > div > div > button > svg`);
    }

}

export { WarehousesPage };