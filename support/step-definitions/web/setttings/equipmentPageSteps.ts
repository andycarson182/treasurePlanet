import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { EquipmentPage } from '../../../pageobjects/web/settings/equipmentPage';
import { randomEquipmentCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneEquipment } from '../../../rest/deleteEndpoints/deleteOneEquipment';
import { CreateOneEquipment } from '../../../rest/createEndpoints/createOneEquipment';
import { GetEquipments } from '../../../rest/getEndpoints/getEquipments';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'EquipmentSettings');
let equipmentPage = new EquipmentPage(chrome);
const deleteOneEquipment = new DeleteOneEquipment();
const createOneEquipment = new CreateOneEquipment();
const getEquipments = new GetEquipments();

const equipmentTableHeaderCells = require('../../../fixtures/headers/equipmentsHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newEquipmentModal.json');

When(/^I click add new equipment button$/, async () => {
    const addNewEquipmentButton = await equipmentPage.addNewEquipmentButton;
    await commonPageElements.clickElement(addNewEquipmentButton);
});

When(/^I check the data table headers are displayed and are correct for equipment$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(equipmentTableHeaderCells);
});

Then(/^I check the required error labels are displayed for equipment creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new equipment modal is closed$/, async () => {
    const newEquipmentModal = await commonPageElements.modalContainer;
    await newEquipmentModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new equipment info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const status = data.status;
    const equipmentType = data.equipmentType;
    const model = data.model;
    const tagId = data.tagId;

    if (code !== undefined) {
        const equipmentCodeToFill = code === "automationEquipmentCode" ? randomEquipmentCode : code;
        await commonPageElements.fillInField(await equipmentPage.equipmentCodeField, equipmentCodeToFill);
    }
    if (label !== undefined) {
        await commonPageElements.fillInField(await equipmentPage.equipmentLabelField, label);
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await equipmentPage.equipmentDescriptionField, description);
    }
    if (status !== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentPage.equipmentStatusDropdown, status);
    }
    if (equipmentType !== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentPage.equipmentTypeDropdown, equipmentType);
    }
    if (model !== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentPage.equipmentModelDropdown, model);
    }
    if (tagId !== undefined) {
        await commonPageElements.fillInField(await equipmentPage.equipmentTagIdField, tagId);
    }
});

Then(/^I verify that the previously saved equipment info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const status = data.status;
    const type = data.type;
    const model = data.model;
    const tagId = data.tagId;

    await chrome.pause(5000); //UI delay
    if (code !== undefined) {
        const equipmentCodeToCheck = code === "automationEquipmentCode" ? randomEquipmentCode.toUpperCase() : code.toUpperCase();
        await equipmentPage.checkExpectedLabelCellIs(row, "code", equipmentCodeToCheck);
    }
    if (label !== undefined) {
        await equipmentPage.checkExpectedLabelCellIs(row, "label", label);
    }
    if (description !== undefined) {
        await equipmentPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (status !== undefined) {
        await equipmentPage.checkExpectedLabelCellIs(row, "status", status);
    }
    if (type !== undefined) {
        await equipmentPage.checkExpectedLabelCellIs(row, "typeLabel", type);
    }
    if (model !== undefined) {
        await equipmentPage.checkExpectedLabelCellIs(row, "modelLabel", model);
    }
    if (tagId !== undefined) {
        await equipmentPage.checkExpectedLabelCellIs(row, "tagId", tagId);
    }
});

Then(/^I verify that the previously saved equipment info is displayed on the edit equipment form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'code', pageElement: equipmentPage.equipmentCodeField },
        { key: 'label', pageElement: equipmentPage.equipmentLabelField },
        { key: 'description', pageElement: equipmentPage.equipmentDescriptionField },
        { key: 'status', pageElement: equipmentPage.equipmentStatusDropdown },
        { key: 'equipmentType', pageElement: equipmentPage.equipmentTypeDropdown },
        { key: 'model', pageElement: equipmentPage.equipmentModelDropdown },
        { key: 'tagId', pageElement: equipmentPage.equipmentTagIdField },

    ];

    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (field.key === 'code' && value === "automationEquipmentCode") {
            value = randomEquipmentCode.toUpperCase();
        }
        if (value !== undefined) {
            let inputValue;
            if (field.key === 'equipmentType' || field.key === 'model') {
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

When(/^I filter by column: "(.*)" on the equipment section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the equipment term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {

        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await equipmentPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationEquipmentCode") {
            isMatch = await filterAndCheck(randomEquipmentCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on equipment term filter$/, async (term: string) => {
    if (term === "automationEquipmentCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomEquipmentCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the equipment table$/, async () => {
    const noResultsLabel = await equipmentPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test equipments data$/, async () => {
    const equipmentIds = await getEquipments.getAutomationEquipments();

    if (equipmentIds.length === 0) {
        console.log("No equipments found to delete.");
    } else {
        // Iterate over each equipment ID and delete it
        for (const equipmentId of equipmentIds) {
            await deleteOneEquipment.deleteEquipment(equipmentId);
            console.log(`Deleted equipment with ID: ${equipmentId}`);
        }
    }
});

When(/^I create an equipment thru grahpql endpoint$/, async () => {
    await createOneEquipment.createAutomationEquipment();
});