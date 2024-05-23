import { CommonPageElements } from "./commonPageElements";

class CompaniesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get viewWarehouseList() {
        return this.browser.$('#root > div.MuiBox-root.css-144k634 > div.MuiBox-root.css-1p6um65 > div.MuiBox-root.css-1ycx4we > div > div.MuiBox-root.css-1mf0lwe > div.MuiBox-root.css-ysgkam > div.MuiBox-root.css-r8nqy > a')
    }

    public get addNewCompanyButton() {
        return this.browser.$('div.MuiBox-root.css-r8nqy > button');
    }

    /*  Add New Company Modal Fields */

    // Company Details
    public get companyCodeField() {
        return this.browser.$('[data-testid=company-code]');
    }

    public get companyNameField() {
        return this.browser.$('[data-testid=company-name]');
    }

    //Company Contact Information
    public get companyEmailField() {
        return this.browser.$('[data-testid=company-email]');
    }
    public get companyPhoneField() {
        return this.browser.$('[data-testid=company-phone]');
    }

    public get companyStreet1Field() {
        return this.browser.$('[data-testid=company-street1]');
    }

    public get companyStreet2Field() {
        return this.browser.$('[data-testid=company-street2]');
    }

    public get companyCountryDropdown() {
        return this.browser.$('[data-testid=country-dropdown-input]');
    }

    public get companyCityField() {
        return this.browser.$('[data-testid=company-city]');
    }

    public get companyStateDropdown() {
        return this.browser.$('[data-testid=state-dropdown-input]');
    }

    //https://fulfilld.atlassian.net/browse/DEV-3339
    public get companyStateField() {
        return this.browser.$('#state');
    }

    public get companyZipField() {
        return this.browser.$('[data-testid=company-zip]');
    }

    // Company Display Preferences

    public get companyCurrencyDropdown() {
        return this.browser.$('[data-testid=displayPref-currency]');
    }
    public get companyLanguageDropdown() {
        return this.browser.$('[data-testid=displayPref-language]');
    }
    public get companyDateFormatDropdown() {
        return this.browser.$('[data-testid=displayPref-dateFormat]');
    }
    public get companyTimeFormatDropdown() {
        return this.browser.$('[data-testid=displayPref-timeFormat]');
    }
    public get companyTimeZoneDropdown() {
        return this.browser.$('[data-testid=displayPref-timezone]');
    }

    public get companyMeasurementSystemField() {
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

export { CompaniesPage };