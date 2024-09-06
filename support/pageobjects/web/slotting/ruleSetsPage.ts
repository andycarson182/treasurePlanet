import { CommonPageElements } from "../commonPageElements";

class RuleSetsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get createNewRuleSetButton() {
        return this.browser.$('.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary.css-1991viq'); // Needs a testid identificator
    }
    
    public get viewExclusionsButton(){
        return this.browser.$('.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.css-jqwcf1');// Needs a testid identificator
    }

    public get actionsButton() {
        return this.browser.$('[data-testid=rulesetsActions_button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-TeamSettings-noResults]');
    }

    public getRuleSetsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-Rulesets-cell-${1 - row}_${cellType}]`);
    }

    public getActionOption(actionOption: number) {
        return this.browser.$(`#rulesets-action-menu ul > li:nth-child(${actionOption})`)
    }

    /*  Create New Rule Set Fields*/

    public get generalNameField() {
        return this.browser.$('input[name=name]');
    }

    public get maxMovements(){
        return this.browser.$('input[name=maxMovements]');
    }

    public getTimeFrameRadioButtonOption(timeFrameOption:number){
        return this.browser.$(`(//input[@name="Forecasting"])[${timeFrameOption}]`);
    }

    public get errorMessage(){
        return this.browser.$('#ruleset-name-helper-text');
    }
    public getAbcAnalysisCriteriaRadiButtonOption(abcAnalysisCriteriaOption:number){
        return this.browser.$(`(//input[@name="abcAnalysis"])[${abcAnalysisCriteriaOption}]`);
    }

    public  get abcCriteriaDropdown(){
        return this.browser.$('#ruleset-abc-analysis-criteria') // needs a custom sleector
    }

    public get aIndicatorPercentageInput(){
        return this.browser.$(' label:nth-child(1) > div > div > input')
    }

    public get bIndicatorPercentageInput(){
        return this.browser.$(' label:nth-child(2) > div > div > input')
    }

    public get cIndicatorPercentageInput(){
        return this.browser.$(' label:nth-child(3) > div > div > input')
    }

    public getWarehouseRestrictionOption(option:number){
        return this.browser.$(`(//span[contains(@class, 'MuiCheckbox-root') and contains(@class, 'css-a9sl58')])[${option}]`)
    }

    public get pickDensityInput(){
        return this.browser.$('div.css-1k7txfw > input[name="weights.pickDensity"]')
    }

    public get pickEfficiencyInput(){
        return this.browser.$('div.css-1k7txfw > input[name="weights.pickEfficiency"]')
    }

    public get avoidCongestionInput(){
        return this.browser.$('div.css-1k7txfw > input[name="weights.avoidCongestion"]')
    }

    public get favorGroundLevelInput(){
        return this.browser.$('div.css-1k7txfw > input[name="weights.favorGroundLevel"]')
    }

    public get putawayDensityInput(){
        return this.browser.$('div.css-1k7txfw > input[name="weights.putawayDensity"]')
    }

    public get putawayEfficiencyInput(){
        return this.browser.$('div.css-1k7txfw > input[name="weights.putawayEfficiency"]')
    }

    public get createZoneGroup(){
        return this.browser.$('[data-testid=create-bin-button]')
    }

    public get editZoneButton(){
        return this.browser.$('[data-testid=edit-zone-ruleset]')
    }


    /*  Rule set details page*/

    public get copyRuleSetButton(){
        return this.browser.$('//button[contains(text(), "Copy Rule Set")]')
    }

    public get ruleSetDetailname(){
        return this.browser.$('[data-testid=justified-column-0-0-value]')
    }

    public get ruleSetDetailRunCount(){
        return this.browser.$('[data-testid=justified-column-1-0-value]')
    }

    public get ruleSetDetailCreatedBy(){
        return this.browser.$('[data-testid=justified-column-0-1-value]')
    }

    public get ruleSetDetailLastUpdate(){
        return this.browser.$('[data-testid=justified-column-0-1-value]')
    }



    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getRuleSetsTableCell(row, cellType);
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
            'Copy Rule Set': 1,
            'Delete Rule Set': 2
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

export { RuleSetsPage };
