class SettingsPage{
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get searchBar() {
        return this.browser.$('.MuiAutocomplete-input');
    }

    async searchBySection(searchWord:string) {
        const searchBarElement = await this.searchBar;
        await searchBarElement.setValue(searchWord);
        await this.browser.keys(['\uE007']);
    }

}

export { SettingsPage };