class SlottingDashboard{
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }
    public get createNewSimulationButton(){
        return this.browser.$('[data-testid=slotting-dashboard-run-create]');
    }

    public get goToSimulationDetailsButton(){
        return this.browser.$('[data-testid=slotting-dashboard-go-to-newest-run]');
    }
    
    public get newestSimulationTab(){
        return this.browser.$('div.MuiBox-root.css-g5ytdj > div > div > div > button:nth-child(1)');
    }

    public get currentlyDeployedTab(){
        return this.browser.$('div.MuiBox-root.css-g5ytdj > div > div > div > button:nth-child(2)');
    }
    
    public get datePickerFromField(){
        return this.browser.$('[data-testid=date-range-picker-from]');
    }

    public get datePickerToField(){
        return this.browser.$('[data-testid=date-range-picker-to]');
    }

    public getDataSetStartDatePicker(date:number) {
        return this.browser.$(`(//div[contains(@class, 'MuiDayCalendar-root')])[1]//button[normalize-space(text())='${date}']`);
    }

    public  getDataSetEndDatePicker(date:number) {
        return this.browser.$(`(//div[contains(@class, 'MuiDayCalendar-root')])[2]//button[normalize-space(text())='${date}']`);
    }
}

export {SlottingDashboard}