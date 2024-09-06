import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { WarehouseRoleTypesPage } from '../../../pageobjects/web/settings/warehouseRoleTypesPage';
import { randomWarehouseRoleTypeCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneWarehouseRoleType } from '../../../rest/deleteEndpoints/deleteOneWarehouseRoleType';
import { CreateOneWarehouseRoleType } from '../../../rest/createEndpoints/createOneWarehouseRoleType';
import { GetWarehouseRoleTypes } from '../../../rest/getEndpoints/getWarehouseRoleTypes';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'WarehouseRoleTypeSettings');
let warehouseRoleTypesPage = new WarehouseRoleTypesPage(chrome);
const deleteOneWarehouseRoleType = new DeleteOneWarehouseRoleType();
const getWarehouseRoleTypes = new GetWarehouseRoleTypes();
const createOneWarehouseRoleType = new CreateOneWarehouseRoleType();

const warehouseRoleTypesTableHeaderCells = require('../../../fixtures/headers/warehouseRoleTypesHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newWarehouseRoleTypeModal.json');

When(/^I click add new warehouse role type button$/, async () => {
    const createNewTypeButton = await warehouseRoleTypesPage.addNewTypeButton;
    await commonPageElements.clickElement(createNewTypeButton);
});
When(/^I click the edit warehouse role type button$/, async () => {
    const editWarehouseRoleTypesButton = await warehouseRoleTypesPage.editButton;
    await commonPageElements.clickElement(editWarehouseRoleTypesButton);
});

When(/^I check the data table headers are displayed and are correct for warehouse role types$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(warehouseRoleTypesTableHeaderCells);
});

Then(/^I verify the new warehouse role type modal is closed$/, async () => {
    const newWarehouseRoleTypeModal = await commonPageElements.modalContainer;
    await newWarehouseRoleTypeModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

Then(/^I check the required error labels are displayed for warehouse role type creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

When(/^I fill in the new warehouse role type info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldActions = {
        code: async () => {
            const warehouseRoleTypeCodeToFill = data.code === "automationWarehouseRoleTypeCode" ? randomWarehouseRoleTypeCode : data.code;
            await commonPageElements.fillInField(await warehouseRoleTypesPage.warehouseRoleTypeCodeField, warehouseRoleTypeCodeToFill);
        },
        label: async () => {
            await commonPageElements.fillInField(await warehouseRoleTypesPage.warehouseRoleTypeLabelField, data.label);
        },
        description: async () => {
            await commonPageElements.fillInField(await warehouseRoleTypesPage.warehouseRoleTypeDescriptionField, data.description);
        },
        speed: async () => {
            await commonPageElements.fillInField(await warehouseRoleTypesPage.warehouseRoleTypeSpeedField, data.speed);
        },
        speedUoM: async () => {
            await commonPageElements.selectTypeaheadOption(await warehouseRoleTypesPage.warehouseRoleTypeSpeedUoMTypeahead, data.speedUoM);
        },
        costPerHour: async () => {
            await commonPageElements.fillInField(await warehouseRoleTypesPage.warehouseRoleTypeCostPerHourField, data.costPerHour);
        },
        weightLimit: async () => {
            await commonPageElements.fillInField(await warehouseRoleTypesPage.warehouseRoleTypeWeightLimitField, data.weightLimit);
        },
        weightUoM: async () => {
            await commonPageElements.selectTypeaheadOption(await warehouseRoleTypesPage.warehouseRoleTypeWeightUoMTypeahead, data.weightUoM);
        }
    };

    for (const [key, action] of Object.entries(fieldActions)) {
        if (data[key] !== undefined) {
            await action();
        }
    }
});

Then(/^I verify that the previously saved warehouse roles type info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.tagName;
    const label = data.tagDescription;
    const description = data.tagDescription;
    const speed = data.tagDescription;
    const speedUoM = data.tagDescription;
    const weightLimit = data.weightLimit;
    const weightUoM = data.tagDescription;
    const costPerHour = data.tagDescription;
    const currency = data.currency;


    await chrome.pause(5000); //UI delay
    if (code !== undefined) {
        const warehouseRoleTypeToCheck = code === "automationWarehouseRoleTypeCode" ? randomWarehouseRoleTypeCode : code;
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "code", warehouseRoleTypeToCheck);
    }
    if (label !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "label", label);
    }
    if (description !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (speed !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "velocity", speed);
    }
    if (speedUoM !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "velocityUOMCode", speedUoM);
    }
    if (weightLimit !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "weightMax", weightLimit);
    }
    if (weightUoM !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "weightUOMCode", weightUoM);
    }
    if (costPerHour !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "cost", costPerHour);
    }
    if (currency !== undefined) {
        await warehouseRoleTypesPage.checkExpectedLabelCellIs(row, "currency", currency);
    }
});

Then(/^I verify that the previously saved warehouse role type info is displayed on the edit warehouse role type form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'code', pageElement: warehouseRoleTypesPage.warehouseRoleTypeCodeField },
        { key: 'label', pageElement: warehouseRoleTypesPage.warehouseRoleTypeLabelField },
        { key: 'description', pageElement: warehouseRoleTypesPage.warehouseRoleTypeDescriptionField },
        { key: 'speed', pageElement: warehouseRoleTypesPage.warehouseRoleTypeSpeedField },
        { key: 'speedUoM', pageElement: warehouseRoleTypesPage.warehouseRoleTypeSpeedUoMTypeahead },
        { key: 'costPerHour', pageElement: warehouseRoleTypesPage.warehouseRoleTypeCostPerHourField },
        { key: 'currency', pageElement: warehouseRoleTypesPage.warehouseRoleTypeCurrencyField },
        { key: 'weightLimit', pageElement: warehouseRoleTypesPage.warehouseRoleTypeWeightLimitField },
        { key: 'weightUoM', pageElement: warehouseRoleTypesPage.warehouseRoleTypeWeightUoMTypeahead }


    ];
    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (field.key === 'code' && value === "automationWarehouseRoleTypeCode") {
            value = randomWarehouseRoleTypeCode;
        }
        if (value !== undefined) {
            let inputValue;
            if (field.key === 'currency') {
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

When(/^I filter by column: "(.*)" on the warehouse role types section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the warehouse role types term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await warehouseRoleTypesPage.checkExpectedLabelCellIs("1", "code", expectedValue);
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
        if (term === "automationWarehouseRoleTypeCode") {
            isMatch = await filterAndCheck(randomWarehouseRoleTypeCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on warehouse role types term filter$/, async (term: string) => {
    if (term === "automationWarehouseRoleTypeCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomWarehouseRoleTypeCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the warehouse role types table$/, async () => {
    const noResultsLabel = await warehouseRoleTypesPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test warehouse role types$/, async () => {
    const warehouseRoleTypeIds = await getWarehouseRoleTypes.getAutomationWarehouseRoleTypes();

    if (warehouseRoleTypeIds.length === 0) {
        console.log("No warehouse role type found to delete.");
    } else {
        // Iterate over each warehouse role type ID and delete the warehouse role type
        for (const warehouseRoleTypeId of warehouseRoleTypeIds) {
            await deleteOneWarehouseRoleType.deleteWarehouseRoleType(warehouseRoleTypeId);
            console.log(`Deleted warehouse role type with ID: ${warehouseRoleTypeId}`);
        }
    }
});

When(/^I create a warehouse role type thru grahpql endpoint$/, async () => {
    await createOneWarehouseRoleType.createAutomationWarehouseRoleType();
});


