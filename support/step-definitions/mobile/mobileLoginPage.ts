import { Given } from '@wdio/cucumber-framework';
import { LoginPage } from '../../pageobjects/mobile/loginPage';
import { multiremotebrowser } from '@wdio/globals';

const appium = multiremotebrowser.getInstance('appium');
let loginPage = new LoginPage(appium);

Given(/^I login in mobile fulfilld app$/, async () => {
    await loginPage.signIn('FDUser01@fulfilld.io', '0JnExxt9');
});

