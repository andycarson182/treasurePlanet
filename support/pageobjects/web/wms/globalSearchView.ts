import { CommonPageElements } from "../commonPageElements";

class GlobalSearchView {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get globalSearchBar() {
        return this.browser.$('[data-testid=header-searchbar] input');
    }

    public get cancelButton() {
        return this.browser.$('[data-testid=HighlightOffIcon]');
    }

    public get searchButton() {
        return this.browser.$('[data-testid=SearchIcon]');
    }

    
    public get globalSearchHeader(){
        return this.browser.$('h1.css-tsq495');
    }
    
    public get globalSearchSubheader(){
        return this.browser.$('p.css-10elf8g');
    }
    
    public get fromDatePicket(){
        return this.browser.$('[data-testid=date-range-picker-from]');
    }

    public get toDatePicket(){
        return this.browser.$('[data-testid=date-range-picker-to]');
    }

    public get applyButton(){
        return this.browser.$('//button[contains(text(), "Apply")]')
    }

    public get clearButton(){
        return this.browser.$('//button[contains(text(), "Clear")]')
    }

    public getLastUpdate(index:number){
        return this.browser.$(`div.MuiBox-root.css-qx77yd > div:nth-child(${index})`)
    }

    public get lastHourOption(){
        return this.getLastUpdate(2)
    }

    public get last2HoursOption(){
        return this.getLastUpdate(3)
    }
    public get todayOption(){
        return this.getLastUpdate(4)
    }

    public get last7DaysOption(){
        return this.getLastUpdate(5)
    }

    public get last30DaysOption(){
        return this.getLastUpdate(6)
    }
    
    public getLabelCount(index: number) {
        return this.browser.$(`div:nth-child(${index}) > div.MuiBox-root.css-182v7h2`);
    }
    
    public get allResultsLabelCount(){
        return this.browser.$('div.MuiBox-root.css-1hbrf62');
    }

    public get areaLabelCount() {
        return this.getLabelCount(2);
    }
    
    public get productLabelCount() {
        return this.getLabelCount(3);
    }
    
    public get taskLabelCount() {
        return this.getLabelCount(4);
    }

    public get binLabelCount() {
        return this.getLabelCount(5);
    }

    
    public get inboundDeliveryLabelCount() {
        return this.getLabelCount(6);
    }

    
    public get outboundFulfillmentLabelCount() {
        return this.getLabelCount(7);
    }

    
    public get licensePlateLabelCount() {
        return this.getLabelCount(8);
    }

    //Global search labels for product search

    public get productNameLabel(){
        return this.browser.$('div.MuiBox-root.css-xbdgi2');
    }

    public get productDescriptionLabel(){
        return this.browser.$('[data-testid=justified-column-0-0-value]');
    }
}

export { GlobalSearchView };
