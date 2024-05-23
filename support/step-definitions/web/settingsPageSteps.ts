import { When } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { SettingsPage } from '../../pageobjects/web/settingsPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let settingsPage = new SettingsPage(chrome);

When(/^I open the settings section$/, async () => {
    const settingsSection = await commonPageElements.getSidebarLink('settings');
    await commonPageElements.clickElement(settingsSection);
});

When(/^I search for "(.*)" section$/, async (section: string) => {
    await settingsPage.searchBySection(section)
});



