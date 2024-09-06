import { CommonPageElements } from "../commonPageElements";

class TagsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get createNewTagButton() {
        return this.browser.$('[data-testid=create-tag-button]');
    }

    public get actionsButton() {
        return this.browser.$('[data-testid=tagsActions_button]');
    }

    public get noResultsLabel() {
        return this.browser.$('[data-testid=data-table-TagsSettings-noResults]');
    }

    public getTagsTableCell(row: any, cellType: string) {
        return this.browser.$(`[data-testid=data-table-TagsSettings-cell-${1 - row}_${cellType}]`);
    }
    /*  create New tag Modal Fields*/

    public get tagNameField() {
        return this.browser.$('[data-testid=tag-name]');
    }

    public get tagDescriptionField() {
        return this.browser.$('[data-testid=tag-description');
    }

    public getActionOption(actionOption: number) {
        return this.browser.$(`#tags-action-menu  ul > li:nth-child(${actionOption})`)
    }
    
    /* Actions */

    async checkExpectedLabelCellIs(row: string, cellType: string, expectedText: string) {
        const cellElement = await this.getTagsTableCell(row, cellType);
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
            'Edit Tag': 1,
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

export { TagsPage };
