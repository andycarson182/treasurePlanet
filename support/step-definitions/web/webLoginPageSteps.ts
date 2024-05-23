import { Given, When } from '@wdio/cucumber-framework';
import { WebLoginPage } from '../../pageobjects/web/webloginPage';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { multiremotebrowser } from '@wdio/globals';

const chrome = multiremotebrowser.getInstance('chrome');
let webLoginPage = new WebLoginPage(chrome);
let commonPageElements = new CommonPageElements(chrome);


Given(/^I am on the "(.*)" page$/, async (page: string) => {
    await webLoginPage.goTo(page);
});

Given(/^I am on the login page$/, async function () {
    await chrome.maximizeWindow()
    await chrome.url('/auth/support/login'); // WebDriverIO will automatically prepend the base URL
});

When(/^I login in fulfilld app$/, async () => {
    await webLoginPage.supportLogin('support@fulfilld.io', 'QAZwsxEDC1234:)');
});

When(/^I expand the WMS Section$/, async () => {
    const wmsSectionElement = await commonPageElements.wmsSection;
    await (wmsSectionElement).waitForStable();
    await (wmsSectionElement).click();
});




