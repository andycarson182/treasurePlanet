import { CommonPageElements } from "../commonPageElements";

class BusinessPartnersPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get actionsButton() {
        return this.browser.$('[data-testid=businessPartnersActions_button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-BusinessPartnerSettings-noResults]');
    }

    public getBusinessPartnerTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-BusinessPartnerSettings-cell-${1 - row}_${cellType}]`);
    }

    /* New Business Parnter Modal */

    public get businessPartnerCodeField() {
        return this.browser.$('[data-testid=businessPartner-code]');
    }

    public get businessPartnerNameField() {
        return this.browser.$('[data-testid=businessPartner-name]');
    }

    public get businessPartnerLanguageDropdown(){
        return this.browser.$('[data-testid=businessPartner-language]');
    }
    
    public get businessPartnerTimezoneDropdown(){
        return this.browser.$('[data-testid=businessPartner-timezone]');
    }

    public get businessPartnerValidityStarDatePickerDate(){
        return this.browser.$('[name=validityStart]');
    }

    public get businessPartnerValidityEndDatePickerDate(){
        return this.browser.$('[name=validityEnd]'); 
    }

    public get businessPartnerTagsTypeahead(){
        return this.browser.$('#tags-standard');
    }

    public get businessPartnerEmailField(){
        return this.browser.$('[data-testid=businessPartner-email]');
    }

    
    public get businessPartnerPhoneNumberField(){
        return this.browser.$('[data-testid=businessPartner-phone-number]');
    }

    public get businessPartnerStreetField(){
        return this.browser.$('[data-testid=businessPartner-street]');
    }

    public get businessPartnerCountryDropdown(){
        return this.browser.$('[data-testid=businessPartner-country]');
    }

    public get businessPartnerCityField(){
        return this.browser.$('[data-testid=businessPartner-city]');
    }

    public get businessPartnerStateField(){
        return this.browser.$('[data-testid=businessPartner-region-state]');
    }

    public get businessPartnerPostalCodeField(){
        return this.browser.$('[data-testid=businessPartner-postal-code]');
    }

    public getActionOption(actionOption: number) {
        return this.browser.$(`#business-partners-actions-menu  ul > li:nth-child(${actionOption})`)
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getBusinessPartnerTableCell(row, cellType);
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

    async selectActioninMenuOption(actionOption: string) {
        const actionOptionsMap: { [key: string]: number } = {
            'Add Business Partner': 1,
            'Edit Business Partner': 2,
            'Delete Business Partner': 3
        };

        if (!(actionOption in actionOptionsMap)) {
            throw new Error("Not selecting a valid action");
        }

        const actionButton = await this.actionsButton;
        await actionButton.click();
        const optionIndex = actionOptionsMap[actionOption];
        const actionElement = await this.getActionOption(optionIndex);
        await actionElement.click();
    }
}

export { BusinessPartnersPage };
