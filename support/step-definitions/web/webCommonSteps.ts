import { When, Then } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);

When(/^I refresh the current page$/, async () => {
    await chrome.refresh();
});

When(/^I check the page header is "(.*)"$/, async (expectedSectionHeader: string) => {
    await chrome.pause(7500); // uiDelay
    const sectionHeaderElement = await commonPageElements.sectionHeader;
    const sectionHeaderText = await sectionHeaderElement.getText();
    await expect(sectionHeaderText).toEqual(expectedSectionHeader);
});

When(/^I check the page sub-header is "(.*)"$/, async (expectedSectionSubHeader: string) => {
    const sectionSubHeaderElement = await commonPageElements.sectionSubHeader;
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
});

When(/^I verify the URL is "(.*)"$/, async (expectedUrl: string) => {
    const currentUrl = await browser.getUrl();
    const containsExpectedUrl = currentUrl.indexOf(expectedUrl) !== -1;
    console.log("Current URL:", containsExpectedUrl);
    await expect(containsExpectedUrl).toBe(true)
});

Then(/^I just wait (.*)$/, async (time: number) => {
    await chrome.pause(time);
});

When(/^I click the (next|cancel|back|submit|delete|close) button$/, async (buttonName: string) => {
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
        case 'close':
            const modalCloseButton = await commonPageElements.modalCloseButton;
            commonPageElements.clickElement(modalCloseButton);
            break;
    }
});



