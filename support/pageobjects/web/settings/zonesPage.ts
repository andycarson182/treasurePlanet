import { CommonPageElements } from "../commonPageElements";

class ZonesPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get addNewZoneButton() {
        return this.browser.$('[data-testid=create-zone-button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-ZoneSettings-noResults]');
    }

    public getZonesTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-ZoneSettings-cell-${1 - row}_${cellType}]`);
    }

    /*  Add New Zone Modal Fields*/

    public get zoneCodeField() {
        return this.browser.$('[data-testid="zone-code"]');
    }

    public get zoneNameField() {
        return this.browser.$('[data-testid=zone-name]');
    }

    public get zoneDescriptionField() {
        return this.browser.$('[data-testid=zone-description]');
    }

    // Optimize fields
    public getBehaviorUnitOfMeasureRadioButton(behaviorUnitOfMeasureRadioOption:string){
        return this.browser.$(`//input[@name="Behavior Unit of Measure Restrictions" and @value="${behaviorUnitOfMeasureRadioOption}"]`);
    }

    public get zoneBehaviorsTypeAHead(){
        return this.browser.$('[data-testid=zone-optimize-zone-behavior-type]')
    }
    public get uomRestrictionsTypeAhead() {
        return this.browser.$('[data-testid=unit-of-measure-autocomplete]');
    }

    public get deleteIconPickingUoMRestrictionsField(){
        return this.browser.$('MuiChip-deleteIconFilledColorDefault');
    }

    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getZonesTableCell(row, cellType);
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

export { ZonesPage };
