import { When } from '@wdio/cucumber-framework';
import { AgendaPage } from '../../pageobjects/mobile/agendaPage';
import { ReceiveFromProductionPage } from '../../pageobjects/mobile/receiveFromProductionPage';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/mobile/commonPageElements';

const randomLicensePlateNumber = `AUTOMATIONLICENSEPLATE${Math.floor(100000 + Math.random() * 900000)}`;
const appium = multiremotebrowser.getInstance('appium');

let receiveFromProductionPage = new ReceiveFromProductionPage(appium);
let commonPageElements = new CommonPageElements(appium);
let agendaPage = new AgendaPage(appium);

When(/^I click the enter case detail manually button$/, async () => {
    const enterCaseDetailsManuallyButton = await receiveFromProductionPage.enterCaseDetailsManuallyButton;
    await commonPageElements.clickElement(enterCaseDetailsManuallyButton);
});

When(/^I enter a random License Plate number$/, async () => {
    await agendaPage.fillTextInput(randomLicensePlateNumber);
});

When(/^I enter the product code "(.*)"$/, async (productCode: string) => {
    await appium.pause(10000) //UI delayed 
    await receiveFromProductionPage.fillInTypeAHeadInput(productCode);
});

When(/^I select the filtered product$/, async () => {
   const filteredOption =  await receiveFromProductionPage.filteredOption;
   await commonPageElements.clickElement(filteredOption);
});

When(/^I click the select product button$/, async () => {
    const selectProductButton = await receiveFromProductionPage.selectProductButton
    await commonPageElements.clickElement(selectProductButton);
});

When(/^I enter the lot code "(.*)"$/, async (lotCode: string) => {
    await appium.keys('\uE004');
    await agendaPage.fillTextInput(lotCode);
});

When(/^I click the confirm button$/, async () => {
    const confirmButton = await receiveFromProductionPage.confirmButton
    await commonPageElements.clickElement(confirmButton);
});

When(/^I enter the process order "(.*)"$/, async (processOrder: string) => {
    await appium.keys('\uE004');
    await agendaPage.fillTextInput(processOrder);
});

When(/^I enter the manual receiving quantity "(.*)"$/, async (quantity: string) => {
    await agendaPage.fillTextInput(quantity);
});

When(/^I click the confirm quantity button$/, async () => {
    const confirmQuantityButton = await receiveFromProductionPage.confirmQuantity
    await commonPageElements.clickElement(confirmQuantityButton);
});