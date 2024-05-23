import { When } from '@wdio/cucumber-framework';
import { AgendaPage } from '../../pageobjects/mobile/agendaPage';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../pageobjects/mobile/commonPageElements';
import { randomLicensePlateNumber } from '../../utilities/randomDataGenerator';
import { licensePlateCode } from '../web/inventoryPage';

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
    await commonPageElements.fillTextInput(randomLicensePlateNumber);
});

When(/^I select the searched "(b2b|putaway|pick)" task$/, async (taskType: string) => {
    if (taskType === "b2b") {
        await agendaPage.selectTask("Bin to Bin");
    } else if (taskType === "putaway") {
        await agendaPage.selectTask("Putaway");
    } else if (taskType === "pick") {
        await agendaPage.selectTask("Pick");
    } else {
        throw new Error("Invalid task type specified");
    }
    await appium.pause(3000); //UI delay
});

When(/^I enter the saved license plate code in the search bar$/, async () => {
    await commonPageElements.fillTextInput(licensePlateCode);
});




