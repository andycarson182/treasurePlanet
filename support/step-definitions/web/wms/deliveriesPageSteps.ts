import { When, Then } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { DeliveriesPage } from '../../../pageobjects/web/wms/delivieriesPage';
import { multiremotebrowser } from '@wdio/globals';
import { randomAreaCode } from '../../../utilities/randomDataGenerator';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let deliveriesPage = new DeliveriesPage(chrome);
export let destinationLicensePlateCode: string;
export let destinationBinCode: string;
let fulfillmentCode: string;

When(/^I open the deliveries section$/, async () => {
    await chrome.pause(5000);
    const deliveriesSection = await commonPageElements.getSidebarLink('deliveries');
    await commonPageElements.clickElement(deliveriesSection);
});

When(/^I filter by "(.*)" on deliveries and fulfillment term filter$/, async (term: string) => {
    if (term === "automationFulfillmentCode") {
        await commonPageElements.fillFilterOnTerm(await deliveriesPage.filterOnTermInput, randomAreaCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await deliveriesPage.filterOnTermInput, term);
    }
});

When(/^I clear the pre assigned data range on deliveries page$/, async () => {
    const fromDateRangeInput = await deliveriesPage.fromDateRangeInput;
    await fromDateRangeInput.click();
    const clearDateRangeButton = await deliveriesPage.clearDateRangeButton;
    await clearDateRangeButton.click();
});

When(/^I select the row "(.*)" for deliveries and fulfillments code on the deliveries and fulfillments table$/, async (row: number) => {
    const getDeliveriesAndFulfillmentCell = await deliveriesPage.getDeliveriesAndFulfillmentTableCell(row, 'erpCode');
    await getDeliveriesAndFulfillmentCell.click();
});

When(/^I click the assign inventory button in the row "(.*)"$/, async (row: number) => {
    const assignInventoryButton = await deliveriesPage.getAssignInventoryButtons(row);
    await assignInventoryButton.click();
});

When(/^I select the first available license plate checkbox in the row "(.*)"$/, async (row: number) => {
    const availableLicensePlateCheckbox = await deliveriesPage.getAvailableLicensePlateCheckbox(row);
    await availableLicensePlateCheckbox.scrollIntoView();
    await availableLicensePlateCheckbox.waitForClickable();
    await availableLicensePlateCheckbox.click();
});

Then(/^I see the "(.*)" task was created in the row "(.*)" in the fulfillment tasks table$/, async (taskName: string, row: number) => {
    await deliveriesPage.checkExpectedLabelCellIs(row, 'taskType', taskName);
});

Then(/^I see the task status is "(.*)" in the row "(.*)" in the fulfillment tasks table$/, async (taskStatus: string, row: number) => {
    await deliveriesPage.checkExpectedLabelCellIs(row, 'taskStatus', taskStatus);
});

When(/^I save the destination license plate code of the row "(.*)" in the fulfillment tasks table$/, async (row: any) => {
    destinationLicensePlateCode = await (await deliveriesPage.getDestinationLicensePlateCode(row)).getText();
    console.log('This is your destination license plate code:', destinationLicensePlateCode);
});

When(/^I save the destination bin code of the row "(.*)" in the fulfillment tasks table$/, async (row: any) => {
    destinationBinCode = await (await deliveriesPage.getDestinationBinCode(row)).getText();
    console.log('This is your destination bin code:', destinationBinCode);
});

When(/^I select the fulfillment item in the row "(.*)" on delivies page$/, async (row: number) => {
    const fulfillmentCodeCell = await deliveriesPage.getFulfillmentItemsTableCell(row, 'fulfillmentCode');
    await fulfillmentCodeCell.scrollIntoView();
    await fulfillmentCodeCell.waitForClickable();
    await fulfillmentCodeCell.click();
});

When(/^I save the fulfillment code of the row "(.*)" in the fulfillment items table$/, async (row: number) => {
    const cellElement = await deliveriesPage.getFulfillmentItemsTableCell(row, 'fulfillmentCode');
    await browser.waitUntil(async () => {
        fulfillmentCode = await cellElement.getText();
        return fulfillmentCode.trim() !== '';
    }, {
        timeout: 10000, // Adjust the timeout as needed
        timeoutMsg: 'Expected fulfillment code to be populated but it was empty'
    });
    console.log('This is your saved fulfillment code:', fulfillmentCode);
});

Then(/^I check the fulfillment details page header is "Fulfillment and the saved fulfillment code"$/, async () => {
    console.log('Saved fulfillment code:', fulfillmentCode);
    
    const expectedSectionHeader = `Fulfillment - ${fulfillmentCode}`.trim();
    const sectionHeaderElement = await deliveriesPage.outboundHeaderPage;
    await sectionHeaderElement.waitForDisplayed();
    await browser.waitUntil(
        async () => {
            const sectionHeaderText = (await sectionHeaderElement.getText()).replace(/\s+/g, ' ').trim();
            return sectionHeaderText === expectedSectionHeader;
        },
        {
            timeout: 12000, // Adjust the timeout as needed
            timeoutMsg: `Expected section header to be '${expectedSectionHeader}' but it was not found`
        }
    );
    const sectionHeaderText = (await sectionHeaderElement.getText()).replace(/\s+/g, ' ').trim();
    expect(sectionHeaderText).toEqual(expectedSectionHeader);
});

Then(/^I expand the fulfillment items table$/, async () => {
    await deliveriesPage.toggleExpand('fulfillment items', 'expand');
});
