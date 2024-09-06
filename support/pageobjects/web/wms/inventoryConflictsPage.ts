class InventoryConflictsPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get resolveConflictsButton() {
        return this.browser.$('//button[text()="Resolve Conflicts"]');
    }


    public get modalTitle(){
        return this.browser.$('[data-testid=modal-32-title]');
    }
    
    public get modalDescription(){
        return this.browser.$('div.MuiDialogContent-root.css-14dr5oz');
    }

    public get confirmationModalTitle(){
        return this.browser.$('[data-testid=modal-69-title]');
    }

    public get confirmationModalDescription(){
        return this.browser.$('div.MuiBox-root.css-r32ezy > p');
    }

    public getTooltipMessage(message: string) {
        return browser.$(`//span[contains(@aria-label, '${message}')]`);
    }

    //System Comparison tables

    public getFulfilldValue(index: number) {
        return this.browser.$(`[data-testid=data-table-SystemComparison-cell-${index}_ffValue]`);
    }

    public getSapValue(index: number) {
        return this.browser.$(`[data-testid=data-table-SystemComparison-cell-${index}_sapValue]`);
    }
    
    public get fulfilldLicensePlateValue() {
        return this.getFulfilldValue(0);
    }
    
    public get fulfilldBinCode() {
        return this.getFulfilldValue(1);
    }
    
    public get fulfilldProductCodeValue() {
        return this.getFulfilldValue(2);
    }
    
    public get fulfilldLotCodeValue() {
        return this.getFulfilldValue(3);
    }
    
    public get fulfilldAvailabilityValue() {
        return this.getFulfilldValue(4);
    }
    
    public get fulfilldStockStatusValue() {
        return this.getFulfilldValue(5);
    }
    
    public get fulfilldQuantityValue() {
        return this.getFulfilldValue(6);
    }
    
    public get fulfilldUoMValue() {
        return this.getFulfilldValue(7);
    }
    

    public get sapLicensePlateValue() {
        return this.getSapValue(0);
    }
    
    public get sapBinCode() {
        return this.getSapValue(1);
    }
    
    public get sapProductCodeValue() {
        return this.getSapValue(2);
    }
    
    public get sapLotCodeValue() {
        return this.getSapValue(3);
    }
    
    public get sapAvailabilityValue() {
        return this.getSapValue(4);
    }
    
    public get sapStockStatusValue() {
        return this.getSapValue(5);
    }
    
    public get sapQuantityValue() {
        return this.getSapValue(6);
    }
    
    public get sapUoMValue() {
        return this.getSapValue(7);
    }

}

export { InventoryConflictsPage};