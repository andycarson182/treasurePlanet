import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { DoorsPage } from '../../pageobjects/web/doorsPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let doorsPage = new DoorsPage(chrome);

const doorTableHeaderCells = require('../../fixtures/headers/doorsHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newDoorModal.json');
const randomDoorCode = `automationDoorCode-${Math.floor(100000 + Math.random() * 900000)}`;

When(/^I click add new door button$/, async () => {
    const addNewDoorButton = await doorsPage.addNewDoorButton;
    await commonPageElements.clickElement(addNewDoorButton);
});

When(/^I click edit door button$/, async () => {
    const editDoorButton = await doorsPage.editButton;
    await commonPageElements.clickElement(editDoorButton);
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
        await commonPageElements.fillInField(await doorsPage.doorXField, y);
    }
});

Then(/^I check the saved door info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const area = data.area;
    const bin = data.bin;
    const direction = data.direction;
    const x = data.x;
    const y = data.y;

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

When(/^I filter by "(.*)" on doors term filter$/, async (term: string) => {
    if (term === "automationDoorCode") {
        await commonPageElements.fillFilterOnTerm(await doorsPage.filterOnTermInput, randomDoorCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await doorsPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the doors table$/, async () => {
    const noResultsLabel = await doorsPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});