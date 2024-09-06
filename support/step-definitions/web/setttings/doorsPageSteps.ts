import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { DoorsPage } from '../../../pageobjects/web/settings/doorsPage';
import { randomDoorCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneDoor } from '../../../rest/deleteEndpoints/deleteOneDoor';
import { CreateOneDoor } from '../../../rest/createEndpoints/createOneDoor';
import { GetDoors } from '../../../rest/getEndpoints/getDoors';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'DoorSettings');
let doorsPage = new DoorsPage(chrome);
const deleteOneDoor = new DeleteOneDoor();
const createOneDoor = new CreateOneDoor();
const getDoors = new GetDoors();

const doorTableHeaderCells = require('../../../fixtures/headers/doorsHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newDoorModal.json');


When(/^I click add new door button$/, async () => {
    const addNewDoorButton = await doorsPage.addNewDoorButton;
    await commonPageElements.clickElement(addNewDoorButton);
});

When(/^I check the data table headers are displayed and are correct for doors$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(doorTableHeaderCells);
});

Then(/^I check the required error labels are displayed for door creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new door modal is closed$/, async () => {
    const newDoorModal = await commonPageElements.modalContainer;
    await newDoorModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new door info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const area = data.area;
    const bin = data.bin;
    const direction = data.direction;
    const x = data.x;
    const y = data.y;


    if (code !== undefined) {
        const doorCodeToFill = code === "automationDoorCode" ? randomDoorCode : code;
        await commonPageElements.fillInField(await doorsPage.doorCodeField, doorCodeToFill);
    }
    if (area !== undefined) {
        await commonPageElements.selectDropdownOption(await doorsPage.doorAreaDropdown, area);
    }
    if (bin !== undefined) {
        await chrome.pause(3000); //UI Delay
        await commonPageElements.selectDropdownOption(await doorsPage.doorBinDropdown, bin);
    }
    if (direction !== undefined) {
        await commonPageElements.selectDropdownOption(await doorsPage.doorDirectionDropdown, direction);
    }
    if (x !== undefined) {
        await commonPageElements.fillInField(await doorsPage.doorXField, x);
    }
    if (y !== undefined) {
        await commonPageElements.fillInField(await doorsPage.doorYField, y);
    }
});

Then(/^I verify that the previously saved door info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const area = data.area;
    const bin = data.bin;
    const direction = data.direction;
    const x = data.x;
    const y = data.y;

    await chrome.pause(5000); //UI delay
    if (code !== undefined) {
        const doorCodeToCheck = code === "automationDoorCode" ? randomDoorCode.toUpperCase() : code.toUpperCase();
        await doorsPage.checkExpectedLabelCellIs(row, "code", doorCodeToCheck);
    }
    if (area !== undefined) {
        await doorsPage.checkExpectedLabelCellIs(row, "areaCode", area);
    }
    if (bin !== undefined) {
        await doorsPage.checkExpectedLabelCellIs(row, "binCode", bin);
    }
    if (direction !== undefined) {
        await doorsPage.checkExpectedLabelCellIs(row, "direction", direction);
    }
    if (x !== undefined) {
        await doorsPage.checkExpectedLabelCellIs(row, "x", x);
    }
    if (y !== undefined) {
        await doorsPage.checkExpectedLabelCellIs(row, "y", y);
    }
});

When(/^I filter by column: "(.*)" on the doors section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});


When(/^I filter by text "(.*)" on the doors term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
        return chrome.waitUntil(async () => {
            try {
                await doorsPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
                return true; // If check passes, return true
            } catch (error) {
                console.error(`Attempt ${attempts + 1} failed: ${error}`);
                return false; // If check fails, return false
            }
        }, {
            timeout: 60000, // Adjust timeout as necessary
            interval: 10000 // Adjust polling interval as necessary
        });
    }

    while (attempts < maxAttempts && !isMatch) {
        if (term === "automationDoorCode") {
            isMatch = await filterAndCheck(randomDoorCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});


When(/^I filter by text "(.*)" on doors term filter$/, async (term: string) => {
    if (term === "automationDoorCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomDoorCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the doors table$/, async () => {
    const noResultsLabel = await doorsPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test doors data$/, async () => {
    const doorIds = await getDoors.getAutomationDoors();

    if (doorIds.length === 0) {
        console.log("No doors found to delete.");
    } else {
        // Iterate over each door ID and delete it
        for (const doorId of doorIds) {
            await deleteOneDoor.deleteDoor(doorId);
            console.log(`Deleted door with ID: ${doorId}`);
        }
    }
});

When(/^I create a door thru grahpql endpoint$/, async () => {
    await createOneDoor.createAutomationDoor();
});
