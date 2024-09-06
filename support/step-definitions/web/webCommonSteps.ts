import { When, Then } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);

When(/^I refresh the current page$/, async () => {
    await chrome.refresh();
});

When(/^I check the page header is "(.*)"$/, async (expectedSectionHeader: string) => {
    const sectionHeaderElement = await commonPageElements.sectionHeader;
    await sectionHeaderElement.waitForDisplayed({ timeout: 120000 });
    await chrome.waitUntil(
        async () => {
            const sectionHeaderText = (await sectionHeaderElement.getText()).replace(/\n/g, ' ');
            return sectionHeaderText  === expectedSectionHeader;
        },
        {
            timeout: 40000,
            timeoutMsg: `Expected section header to be "${expectedSectionHeader}" but it was not found within the timeout period`
        }
    );
    const sectionHeaderText = (await sectionHeaderElement.getText()).replace(/\n/g, ' ');
    await expect(sectionHeaderText).toEqual(expectedSectionHeader);
});

When(/^I check the page sub-header is "(.*)"$/, async (expectedSectionSubHeader: string) => {
    const sectionSubHeaderElement = await commonPageElements.sectionSubHeader;
    await sectionSubHeaderElement.waitForDisplayed({ timeout: 25000 });
    await chrome.waitUntil(
        async () => {
            const sectionSubHeaderText = await sectionSubHeaderElement.getText();
            return  sectionSubHeaderText === expectedSectionSubHeader;
        },
        {
            timeout: 15000,
            timeoutMsg: `Expected section header to be "${expectedSectionSubHeader}" but it was not found within the timeout period`
        }
    );
    const sectionSubHeaderText = await sectionSubHeaderElement.getText();
    await expect(sectionSubHeaderText).toEqual(expectedSectionSubHeader);
});

When(/^I click the page info back button$/, async () => {
    const backButton = await commonPageElements.backButton;
    await commonPageElements.clickElement(backButton);
});

When(/^I click the refresh table button$/, async () => {
    const refreshTableButton = await commonPageElements.refreshTableButton;
    await commonPageElements.clickElement(refreshTableButton);
});


When(/^I click the sideBar fulfilld logo$/, async () => {
    const sidebarFulfilldLogo = await commonPageElements.sidebarFulfilldLogo;
    await commonPageElements.clickElement(sidebarFulfilldLogo);
    await chrome.pause(2000); //UI delay
});

When(/^I verify the URL has "(.*)"$/, async (expectedUrl: string) => {
    const currentUrl = await chrome.getUrl();

    await expect(currentUrl.endsWith(expectedUrl)).toBe(true);
});

Then(/^I just wait "(.*)"$/, async (time: number) => {
    await chrome.pause(time);
});

When(/^I click the (next|cancel|back|submit|delete|edit|close|exit) button$/, async (buttonName: string) => {
    await chrome.pause(3500);
    switch (buttonName) {
        case 'next':
            const modalNextButton = await commonPageElements.modalNextButton;
            commonPageElements.clickElement(modalNextButton);
            break;
        case 'cancel':
            const modalCancelButton = await commonPageElements.modalCancelButton;
            commonPageElements.clickElement(modalCancelButton);
            break;
        case 'back':
            const modalBackButton = await commonPageElements.modalBackButton;
            commonPageElements.clickElement(modalBackButton);
            break;
        case 'submit':
            const modalSubmitButton = await commonPageElements.modalSubmitButton;
            commonPageElements.clickElement(modalSubmitButton);
            break;
        case 'delete':
            const modalDeleteButton = await commonPageElements.modalDeleteButton; //They are reusing the same submit for this component, we need to correct this
            commonPageElements.clickElement(modalDeleteButton);
            break;
        case 'edit':
            const editButton = await commonPageElements.editButton; //The selector attribute is not right, we will need to correct in the future
            commonPageElements.clickElement(editButton);
            break;
        case 'close':
            const modalCloseButton = await commonPageElements.modalCloseButton;
            commonPageElements.clickElement(modalCloseButton);
            break;
        case 'exit':
            const modalExitButton = await commonPageElements.modalExitButton;
            commonPageElements.clickElement(modalExitButton);
            break;
    }
});

When(/^I select the first element of the table$/, async () => {
    await commonPageElements.selectFirstElemenOfTheTable();
});

When(/^I select the checkbox row of the positon "(.*)"$/, async (position: string) => {
    await commonPageElements.selectCheckboxOption(position);
});

When(/^I select the "(.*)" action option$/, async (actionOption: string) => {
    await commonPageElements.selectActionOption(actionOption);
});

When(/^I check the modal header is "(.*)"$/, async (expectedHeader: string) => {
    (await commonPageElements.modalHeader).waitForDisplayed({ timeout: 2500 });
    expect(await commonPageElements.modalHeader.getText()).toEqual(expectedHeader);
});

When(/^I check the snackbar message is "(.*)"$/, async (expectedMessage: string) => {
    await commonPageElements.checkSnackbarMessage(expectedMessage, 'success');
});

When(/^I check the snackbar error message is "(.*)"$/, async (expectedMessage: string) => {
    await commonPageElements.checkSnackbarMessage(expectedMessage, 'error');
});

