import { When } from '@wdio/cucumber-framework';
import { LicensePlateB2b } from '../../pageobjects/mobile/licensePlateB2b';
import { AgendaPage} from '../../pageobjects/mobile/agendaPage';
import {  multiremotebrowser } from '@wdio/globals'
import { destinationBin } from '../web/licensePlateDetailPage';
import { randomLicensePlateNumber } from '../web/inventoryPage';
import {CommonPageElements} from '../../pageobjects/mobile/commonPageElements';

const appium = multiremotebrowser.getInstance('appium');
let licensePlateB2b = new LicensePlateB2b(appium);
let agendaPage = new AgendaPage(appium);
let commonPageElements = new CommonPageElements(appium);

When(/^I click the bad code button$/, async () => {
    const badCodeButton = await licensePlateB2b.badCodeButton;
    await commonPageElements.clickElement(badCodeButton)
});

When(/^I enter "(.*)" as destination bin$/, async (destinationBinValue:string) => {
    await agendaPage.fillTextInput(destinationBinValue);
});

When(/^I enter the assigned destination bin of the License Plate b2b$/, async () => {
    await agendaPage.fillTextInput(destinationBin);
});

When(/^I enter the ingested LP$/, async () => {
    await agendaPage.fillTextInput(randomLicensePlateNumber);
});

When(/^I click search button$/, async () => {
    const searchButton = await licensePlateB2b.searchButton;
    await commonPageElements.clickElement(searchButton)
});