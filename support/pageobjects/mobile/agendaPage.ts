class AgendaPage {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }
    public get plusActionButton() {
        return this.browser.$('//android.view.View/android.view.View[3]/android.widget.Button');
    }

    public get createTaskButton() {
        return this.browser.$('//android.view.View[@content-desc="Create Task"]');
    }

    public get manualReceivingButton() {
        return this.browser.$('//android.view.View[@content-desc="Manual Receiving"]');
    }

    public get lpBinToBin() {
        return this.browser.$('//android.widget.ImageView[@content-desc="License Plate Bin to Bin"]');
    }

    public getSearchedTask(taskName: string) {
        return this.browser.$(`//android.view.View[contains(@content-desc, "${taskName}")]`);
    }
    
    public async selectTask(taskName: string) {
        const searchedTask = await this.getSearchedTask(taskName);
        await searchedTask.waitForDisplayed({ timeout: 15000 });
        await searchedTask.click();
    }
}

export { AgendaPage };