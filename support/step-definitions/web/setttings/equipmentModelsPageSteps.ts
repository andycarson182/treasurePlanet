import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { EquipmentModelsPage } from '../../../pageobjects/web/settings/equipmentModelsPage';
import { randomEquipmentModelCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneEquipmentModel } from '../../../rest/deleteEndpoints/deleteOneEquipmentModel';
import { CreateOneEquipmentModel } from '../../../rest/createEndpoints/createOneEquipmentModel';
import { GetEquipmentModels } from '../../../rest/getEndpoints/getEquipmentModels';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'EquipmentModelSettings');
let equipmentModelsPage = new EquipmentModelsPage(chrome);
const deleteOneEquipmentModel = new DeleteOneEquipmentModel();
const createOneEquipmentModel = new CreateOneEquipmentModel();
const getEquipmentModels = new GetEquipmentModels();

const equipmentModelsTableHeaderCells = require('../../../fixtures/headers/equipmentModelsHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newEquipmentModelModal.json');


When(/^I click add new model button$/, async () => {
    const addNewModelButton = await equipmentModelsPage.addNewModelButton;
    await commonPageElements.clickElement(addNewModelButton);
});

When(/^I check the data table headers are displayed and are correct for equipment models$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(equipmentModelsTableHeaderCells);
});

Then(/^I check the required error labels are displayed for equipment models$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new equipment model modal is closed$/, async () => {
    const newEquipmentModelModal = await commonPageElements.modalContainer;
    await newEquipmentModelModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new equipment model info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const equipmentType = data.equipmentType;
    const code = data.code;
    const label = data.label;
    const description = data.description;

    if (equipmentType !== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentModelsPage.equipmentModelEquipmentTypeDropdown, equipmentType);
    }
    if (code !== undefined) {
        const equipmentModelCodeToFill = code === "automationEquipmentModelCode" ? randomEquipmentModelCode : code;
        await commonPageElements.fillInField(await equipmentModelsPage.equipmentModelCodeField, equipmentModelCodeToFill);
    }
    if (label !== undefined) {
        await commonPageElements.fillInField(await equipmentModelsPage.equipmentModelLabelField, label);
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await equipmentModelsPage.equipmentModelDescription, description);
    }
});

Then(/^I verify that the previously saved equipment models info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const equipmentType = data.equipmentType;

    await chrome.pause(5000); //UI delay

    if (equipmentType !== undefined) {
        await equipmentModelsPage.checkExpectedLabelCellIs(row, "typeLabel", equipmentType)
    }
    if (code !== undefined) {
        const equipmentModelCodeToCheck = code === "automationEquipmentModelCode" ? randomEquipmentModelCode.toUpperCase() : code.toUpperCase();
        await equipmentModelsPage.checkExpectedLabelCellIs(row, "code", equipmentModelCodeToCheck);
    }
    if (label !== undefined) {
        await equipmentModelsPage.checkExpectedLabelCellIs(row, "label", label)
    }
    if (description !== undefined) {
        await equipmentModelsPage.checkExpectedLabelCellIs(row, "description", description);
    }
});

Then(/^I verify that the previously saved equipment model info is displayed on the edit equipment model form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'equipmentType', pageElement: equipmentModelsPage.equipmentModelEquipmentTypeDropdown },
        { key: 'code', pageElement: equipmentModelsPage.equipmentModelCodeField },
        { key: 'label', pageElement: equipmentModelsPage.equipmentModelLabelField },
        { key: 'description', pageElement: equipmentModelsPage.equipmentModelDescription }

    ];
    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (field.key === 'code' && value === "automationEquipmentModelCode") {
            value = randomEquipmentModelCode.toUpperCase();
        }
        if (value !== undefined) {
            let inputValue;
            if (field.key === 'equipmentType') {
                const selectedOption = await field.pageElement.$('option:checked');
                inputValue = await selectedOption.getText();
            } else {
                // For other input types
                inputValue = await field.pageElement.getValue();
            }
            expect(inputValue).toEqual(value);
        }
    }
});

When(/^I filter by column: "(.*)" on the equipment models section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on equipment model term filter$/, async (term: string) => {
    if (term === "automationEquipmentModelCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomEquipmentModelCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

When(/^I filter by text "(.*)" on the equipment model term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await equipmentModelsPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationEquipmentModelCode") {
            isMatch = await filterAndCheck(randomEquipmentModelCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

Then(/^I verify "no results" is displayed on the equipment models table$/, async () => {
    const noResultsLabel = await equipmentModelsPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test equipment models data$/, async () => {
    const equipmentModelIds = await getEquipmentModels.getAutomationEquipmentModels();

    if (equipmentModelIds.length === 0) {
        console.log("No equipment models found to delete.");
    } else {
        // Iterate over each equipment model ID and delete it
        for (const equipmentModelId of equipmentModelIds) {
            await deleteOneEquipmentModel.deleteEquipmentModel(equipmentModelId);
            console.log(`Deleted equipment model with ID: ${equipmentModelId}`);
        }
    }
});

When(/^I create an equipment model thru grahpql endpoint$/, async () => {
    await createOneEquipmentModel.createAutomationEquipmentModel();
});