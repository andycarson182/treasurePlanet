import { When } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../pageobjects/mobile/commonPageElements';
import { destinationLicensePlateCode, destinationBinCode } from '../web/wms/deliveriesPageSteps';

const appium = multiremotebrowser.getInstance('appium');
let commonPageElements = new CommonPageElements(appium);


When(/^I enter the assigned destination license plate code$/, async () => {
    await commonPageElements.fillTextInput(destinationLicensePlateCode);
});

When(/^I enter the assigned destination bin code$/, async () => {
    await commonPageElements.fillTextInput(destinationBinCode);
});
