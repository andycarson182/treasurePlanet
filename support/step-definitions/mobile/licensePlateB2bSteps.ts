import { When } from '@wdio/cucumber-framework';
import { LicensePlateB2b } from '../../pageobjects/mobile/licensePlateB2b';
import {  multiremotebrowser } from '@wdio/globals'
import { destinationBin } from '../web/wms/licensePlateDetailPageSteps';
import {CommonPageElements} from '../../pageobjects/mobile/commonPageElements';
import { randomLicensePlateNumber } from '../../utilities/randomDataGenerator';
import { binCode, licensePlateCode } from '../web/wms/inventoryPageSteps';

const appium = multiremotebrowser.getInstance('appium');
let licensePlateB2b = new LicensePlateB2b(appium);
let commonPageElements = new CommonPageElements(appium);

When(/^I click the bad code button$/, async () => {
    const badCodeButton = await licensePlateB2b.badCodeButton;
    await commonPageElements.clickElement(badCodeButton)
});

When(/^I enter "(.*)" as source bin$/, async (sourceBinValue:string) => {
    await commonPageElements.fillTextInput(sourceBinValue);
});

When(/^I enter "(.*)" as destination bin$/, async (destinationBinValue:string) => {
    await commonPageElements.fillTextInput(destinationBinValue);
});

When(/^I enter "(.*)" as license plate$/, async (licensePlateNumber:string) => {
    await commonPageElements.fillTextInput(licensePlateNumber);
});

When(/^I enter the assigned destination bin of the License Plate b2b$/, async () => {
    await commonPageElements.fillTextInput(destinationBin);
});

When(/^I enter the ingested LP$/, async () => {
    await commonPageElements.fillTextInput(randomLicensePlateNumber);
});

When(/^I enter the saved license plate code on inventory section$/, async () => {
    await commonPageElements.fillTextInput(licensePlateCode);
});

When(/^I enter the saved bin on inventory section$/, async () => {
    await commonPageElements.fillTextInput(binCode);
});
When(/^I click search button$/, async () => {
    const searchButton = await licensePlateB2b.searchButton;
    await commonPageElements.clickElement(searchButton)
});

When(/^I click overrite bin button$/, async () => {
    const overrideBinButton = await licensePlateB2b.overrideBinButton;
    await commonPageElements.clickElement(overrideBinButton)
});