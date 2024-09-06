class DeliveriesPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get fromDateRangeInput() {
        return this.browser.$('[data-testid=date-range-picker-from]');
    }

    public get toDateRangeInput() {
        return this.browser.$('[data-testid=date-range-picker-to]');
    }

    public get clearDateRangeButton() {
        return this.browser.$('.MuiDialogActions-spacing.css-1vskg8q > button:nth-child(1)');
    }

    public get outboundHeaderPage(){
        return this.browser.$('div.MuiBox-root.css-i9gxme');
    }

    public getAssignInventoryButtons(row: number) {
        return this.browser.$(`tr:nth-child(${row}) [data-testid=assign-inventory]`);
    }

    public get filterOnTermInput() {
        return this.browser.$('[data-testid=data-table-DeliveriesFulfillmentsOverview-quick-filter-any-input-input]');
    }

    public getAvailableLicensePlateCheckbox(row: number) {
        return this.browser.$(`[data-testid=data-table-FulfillmentItemAllocation-cell-${row - 1 }_selection]`);
    }

    public getDeliveriesAndFulfillmentTableCell(row: number, cellType: string) {
        return this.browser.$(`[data-testid=data-table-DeliveriesFulfillmentsOverview-cell-${row - 1 }_${cellType}]`);
    }

    public getFulfillmentTasksTableCell(row: number, cellType: string) {
        return this.browser.$(`[data-testid=data-table-OutboundFulfillmentTasks-cell-${row - 1 }_${cellType}]`);
    }

    public getDestinationLicensePlateCode(row: number) {
        return this.browser.$(`[data-testid=data-table-OutboundFulfillmentTasks-cell-${row - 1}_destinationLicensePlateCode]`);
    }

    public getDestinationBinCode(row: number) {
        return this.browser.$(`[data-testid=data-table-OutboundFulfillmentTasks-cell-${row - 1}_destinationBinCode]`);
    }

    public getFulfillmentItemsTableCell(row: number, cellType: string) {
        return this.browser.$(`[data-testid=data-table-DeliveriesFulfillmentsOverview_FulfillmentItems-cell-${row - 1}_${cellType}]`)
    }


    public getItemButton(position: number, expand: boolean) {
        const selector = `div:nth-child(${position}) [data-testid=${expand ? 'AddCircleOutlineRoundedIcon' : 'RemoveCircleOutlineRoundedIcon'}]`;
        return this.browser.$(selector);
    }

    /* Actions */

    public async toggleExpand(table: string, action: 'expand' | 'unexpand'): Promise<void> {
        const position = table === 'fulfillment items' ? 6 : 1;
        const expand = action === 'expand';
        const button = this.getItemButton(position, expand);
        await button.click();
    }

    async checkExpectedLabelCellIs(row: number, cellType: string, expectedText: string) {
        const cellElement = await this.getFulfillmentTasksTableCell(row, cellType);
        const cellText = await cellElement.getText();
        await cellElement.scrollIntoView();
        await cellElement.isDisplayed();
        expect(cellText).toEqual(expectedText);
    }
}

export { DeliveriesPage };