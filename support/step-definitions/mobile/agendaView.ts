import { When } from '@wdio/cucumber-framework';
import { AgendaPage } from '../../pageobjects/mobile/agendaPage';
import {  multiremotebrowser } from '@wdio/globals'
import {CommonPageElements} from '../../pageobjects/mobile/commonPageElements';
import { randomLicensePlateNumber } from '../web/inventoryPage';

const appium = multiremotebrowser.getInstance('appium');
let agendaPage = new AgendaPage(appium);
let commonPageElements = new CommonPageElements(appium);
When(/^I click the plus action button$/, async () => {
    const plusActionButton = await agendaPage.plusActionButton;
    await commonPageElements.clickElement(plusActionButton)
});

When(/^I click the create task button$/, async () => {
    const createTaskButton = await agendaPage.createTaskButton;
    await commonPageElements.clickElement(createTaskButton)
});

When(/^I click the manual receiving button$/, async () => {
    const manualReceivingButton = await agendaPage.manualReceivingButton;
    await commonPageElements.clickElement(manualReceivingButton)
});

When(/^I click the license plate bin 2 bin button$/, async () => {
    const licensePlateb2b = await agendaPage.lpBinToBin;
    await (licensePlateb2b).waitForDisplayed({ timeout: 15000 });
    await (licensePlateb2b).click();
});

When(/^I enter the ingested LP in the search bar$/, async () => {
     await agendaPage.fillTextInput(randomLicensePlateNumber);
});

When(/^I select the searched License Plate Number$/, async () => {
    await agendaPage.selectLicensePlateNumber(randomLicensePlateNumber)
});



