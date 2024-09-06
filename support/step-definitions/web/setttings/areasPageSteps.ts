import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { AreasPage } from '../../../pageobjects/web/settings/areasPage';
import { randomAreaCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneArea } from '../../../rest/deleteEndpoints/deleteOneArea';
import { GetAreas } from '../../../rest/getEndpoints/getAreas';
import { CreateArea } from '../../../rest/createEndpoints/createOneArea';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'AreaSettings');
let areasPage = new AreasPage(chrome);
const deleteOneArea = new DeleteOneArea();
const getAreas = new GetAreas();
const createArea = new CreateArea();

const areaTableHeaderCells = require('../../../fixtures/headers/areasHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newAreaModal.json');

When(/^I filter by column: "(.*)" on the areas section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I click add new area button$/, async () => {
    const addNewAreaButton = await areasPage.addNewAreaButton;
    await commonPageElements.clickElement(addNewAreaButton);
});

When(/^I check the data table headers are displayed and are correct for areas$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(areaTableHeaderCells);
});

Then(/^I check the required error labels are displayed for area creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the (new area|edit area) modal is closed$/, async (_) => {
    const modalContainer = await commonPageElements.modalContainer;
    await modalContainer.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new area info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const name = data.name;
    const status = data.status;
    const targetTemperature = data.targetTemperature;
    const issueNewStockSwitch = data.issueNewStock;
    const receiveNewStockSwitch = data.receiveNewStock;
    const description = data.description;

    if (code !== undefined) {
        const areaCodeToFill = code === "automationAreaCode" ? randomAreaCode : code;
        await commonPageElements.fillInField(await areasPage.areaCodeField, areaCodeToFill);
    }
    if (name !== undefined) {
        await commonPageElements.fillInField(await areasPage.areaNameField, name);
    }
    if (status !== undefined) {
        await commonPageElements.selectDropdownOption(await areasPage.areaStatusDropdown, status);
    }
    if (targetTemperature !== undefined) {
        await commonPageElements.fillInField(await areasPage.areaTargetTemperatureField, targetTemperature);
    }
    if (issueNewStockSwitch !== undefined) {
        (await areasPage.issueNewStockSwitch).click()
    }
    if (receiveNewStockSwitch !== undefined) {
        (await areasPage.receiveNewStockSwitch).click()
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await areasPage.areaDescriptionField, description);
    }
});

Then(/^I verify that the previously saved area info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const name = data.name;
    const description = data.description;
    const issueNewStock = data.issueNewStock;
    const receiveNewStock = data.receiveNewStock;
    const status = data.status;
    const targetTemperature = data.targetTemperature;

    await chrome.pause(5000); //UI delay

    if (code !== undefined) {
        const areaCodeToCheck = code === "automationAreaCode" ? randomAreaCode.toUpperCase() : code.toUpperCase();
        await areasPage.checkExpectedLabelCellIs(row, "code", areaCodeToCheck);
    }
    if (name !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "name", name);
    }
    if (description !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (issueNewStock !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "exitPoint", issueNewStock);
    }
    if (receiveNewStock !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "entryPoint", receiveNewStock);
    }
    if (status !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "status", status);
    }
    if (targetTemperature !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "targetTemperature", targetTemperature);
    }
});

Then(/^I verify that the previously saved area info is displayed on the edit area form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const name = data.name;
    const status = data.status;
    const targetTemperature = data.targetTemperature;
    const issueNewStockSwitch = data.issueNewStock;
    const receiveNewStockSwitch = data.receiveNewStock;
    const description = data.description;

    await chrome.pause(5000); //UI delay

    if (code !== undefined) {
        const areaCode = code === "automationAreaCode" ? randomAreaCode : code;
        const inputValue = await areasPage.areaCodeField.getValue();
        expect(inputValue).toEqual(areaCode.toUpperCase());
    }
    if (name !== undefined) {
        const inputValue = await areasPage.areaNameField.getValue();
        expect(inputValue).toEqual(name);
    }
    if (status !== undefined) {
        const dropdownValue = await areasPage.areaStatusDropdown.getValue();
        expect(dropdownValue).toEqual(status);
    }
    if (targetTemperature !== undefined) {
        const inputValue = await areasPage.areaTargetTemperatureField.getValue();
        expect(inputValue).toEqual(targetTemperature);
    }
    if (issueNewStockSwitch !== undefined) {
        const inputValue = await areasPage.issueNewStockSwitch.getValue();
        expect(inputValue).toEqual(issueNewStockSwitch);
    }
    if (receiveNewStockSwitch !== undefined) {
        const inputValue = await areasPage.receiveNewStockSwitch.getValue();
        expect(inputValue).toEqual(receiveNewStockSwitch);
    }
    if (description !== undefined) {
        const inputValue = await areasPage.areaDescriptionField.getValue();
        expect(inputValue).toEqual(description);
    }
});

When(/^I filter by text "(.*)" on the areas term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
        return chrome.waitUntil(async () => {
            try {
                await areasPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
                return true; // If check passes, return true
            } catch (error) {
                console.error(`Attempt ${attempts + 1} failed: ${error}`);
                return false; // If check fails, return false
            }
        }, {
            timeout: 30000, // Adjust timeout as necessary
            interval: 5000 // Adjust polling interval as necessary
        });
    }

    while (attempts < maxAttempts && !isMatch) {
        if (term === "automationAreaCode") {
            isMatch = await filterAndCheck(randomAreaCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on areas term filter$/, async (term: string) => {
    if (term === "automationAreaCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomAreaCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the areas table$/, async () => {
    const noResultsLabel = await areasPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test areas$/, async () => {
    const areaIds = await getAreas.getAutomationAreas();

    if (areaIds.length === 0) {
        console.log("No areas found to delete.");
    } else {
        // Iterate over each area ID and delete the area
        for (const areaId of areaIds) {
            await deleteOneArea.deleteArea(areaId);
            console.log(`Deleted area with ID: ${areaId}`);
        }
    }
});

When(/^I create an area thru grahpql endpoint with the area code: "(.*)"$/, async (areaCode: string) => {
    await createArea.createAutomationArea(areaCode);
});