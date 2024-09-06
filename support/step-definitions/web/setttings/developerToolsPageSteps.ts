import { When } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { DeveloperToolsPage } from '../../../pageobjects/web/settings/developerToolsPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let developerToolsPage = new DeveloperToolsPage(chrome);


When(/^I click the "(.*)" data generation button$/, async (buttonOption:string) => {
    const dataGenerationButton = await developerToolsPage.getDataGenerationButton(buttonOption)
    await commonPageElements.clickElement(dataGenerationButton);
});

When(/^I wait for the loading spinner to disappear for data generation$/, async () => {
    const timeout = 60000; // Timeout of 60 seconds

    // Wait until the element is no longer displayed
    await browser.waitUntil(
        async () => {
            const spinner = await developerToolsPage.spinnerIcon; // Access spinner element
            return !(await spinner.isDisplayed()); // Check if spinner is not displayed
        },
        {
            timeout: timeout,
            timeoutMsg: `Expected the spinner to disappear within ${timeout}ms, but it is still visible.`
        }
    );
});