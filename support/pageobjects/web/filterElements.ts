class FilterElements {
    browser: WebdriverIO.Browser;
    private tableType: string;
    
    constructor(browser: WebdriverIO.Browser, tableType: string) {
        this.browser = browser;
        this.tableType = tableType;
    }

    private getFilterElement(filterType: string) {
        return this.browser.$(`[data-testid=data-table-${this.tableType}-quick-filter-${filterType}]`);
    }

    public get filterByColumn() {
        return this.getFilterElement('filter-column-input');
    }

    public get filterOnTermInput() {
        return this.getFilterElement('any-input-input');
    }

    public get filterOnTextInput() {
        return this.getFilterElement('text-input');
    }

    public get filterOnValueInput(){
        return this.getFilterElement('enum-input');
    }
}


export { FilterElements };