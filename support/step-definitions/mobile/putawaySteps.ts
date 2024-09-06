import { Then, When } from '@wdio/cucumber-framework';
import { Putaway } from '../../pageobjects/mobile/putaway';
import { multiremotebrowser } from '@wdio/globals'
import { destinationBin } from '../web/wms/licensePlateDetailPageSteps';
import { CommonPageElements } from '../../pageobjects/mobile/commonPageElements';

const appium = multiremotebrowser.getInstance('appium');
let putaway = new Putaway(appium);
let commonPageElements = new CommonPageElements(appium);

Then(/^I verify the unexpected bin message is: "(.*)" expected but "(.*)" was scanned.$/, async (expectedDestinationBin: string, unexpectedDestinationBin: string) => {
    const unexpectedHeader = await putaway.unexpectedBinHeader;
    let unexpectedMessage;
    if (expectedDestinationBin === "savedDestinationBin") {
        unexpectedMessage = await putaway.getUnexpectedMessage(destinationBin, unexpectedDestinationBin);
    } else {
        unexpectedMessage = await putaway.getUnexpectedMessage(expectedDestinationBin, unexpectedDestinationBin);
    }
    await unexpectedHeader.isDisplayed();
    await unexpectedMessage.isDisplayed();
});

When(/^I click the bin not available button$/, async () => {
    const binNotAvailableButton = await putaway.binNotAvailableButton;
    await commonPageElements.clickElement(binNotAvailableButton)
});

