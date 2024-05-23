import { When } from '@wdio/cucumber-framework';
import { ReceiveFromProductionPage } from '../../pageobjects/mobile/receiveFromProductionPage';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/mobile/commonPageElements';
import { manualReceivingRandomLicensePlateNumber } from '../../utilities/randomDataGenerator';


const appium = multiremotebrowser.getInstance('appium');

let receiveFromProductionPage = new ReceiveFromProductionPage(appium);
let commonPageElements = new CommonPageElements(appium);

When(/^I click the enter case detail manually button$/, async () => {
    const enterCaseDetailsManuallyButton = await receiveFromProductionPage.enterCaseDetailsManuallyButton;
    await commonPageElements.clickElement(enterCaseDetailsManuallyButton);
});

When(/^I enter a random license plate number$/, async () => {
    await commonPageElements.fillTextInput(manualReceivingRandomLicensePlateNumber);
});

When(/^I enter the product code "(.*)"$/, async (productCode: string) => {
    await appium.pause(10000) //UI delayed 
    await receiveFromProductionPage.fillInTypeAHeadInput(productCode);
});

When(/^I select the filtered product$/, async () => {
   const filteredOption =  await receiveFromProductionPage.filteredOption;
   await commonPageElements.clickElement(filteredOption);
});

When(/^I enter the lot code "(.*)"$/, async (lotCode: string) => {
    await appium.keys('\uE004');
    await commonPageElements.fillTextInput(lotCode);
});

When(/^I click the confirm button$/, async () => {
    const confirmButton = await receiveFromProductionPage.confirmButton
    await commonPageElements.clickElement(confirmButton);
});

When(/^I enter the process order "(.*)"$/, async (processOrder: string) => {
    await appium.keys('\uE004');
    await commonPageElements.fillTextInput(processOrder);
});

When(/^I enter the manual receiving quantity "(.*)"$/, async (quantity: string) => {
    await commonPageElements.fillTextInput(quantity);
});

When(/^I click the confirm quantity button$/, async () => {
    const confirmQuantityButton = await receiveFromProductionPage.confirmQuantity
    await commonPageElements.clickElement(confirmQuantityButton);
});

When(/^I enter the created manual receiving random license plate in the search bar$/, async () => {
    await commonPageElements.fillTextInput(manualReceivingRandomLicensePlateNumber);
});

When(/^I enter the manual receiving random license plate$/, async () => {
    await commonPageElements.fillTextInput(manualReceivingRandomLicensePlateNumber);
});