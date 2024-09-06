import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { EquipmentTypesPage } from '../../../pageobjects/web/settings/equipmentTypesPage';
import { randomEquipmentTypeCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneEquipmentType } from '../../../rest/deleteEndpoints/deleteOneEquipmentType';
import { CreateOneEquipmentType } from '../../../rest/createEndpoints/createOneEquipmentType';
import { GetEquipmentTypes } from '../../../rest/getEndpoints/getEquipmentTypes';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'EquipmentTypeSettings');
let equipmentTypesPage = new EquipmentTypesPage(chrome);
const deleteOneEquipmentType = new DeleteOneEquipmentType();
const createOneEquipmentType = new CreateOneEquipmentType();
const getEquipmentTypes = new GetEquipmentTypes();

const equipmentTypesTableHeaderCells = require('../../../fixtures/headers/equipmentTypesHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newEquipmentTypeModal.json');


When(/^I click add new type button$/, async () => {
    const addNewTypeButton = await equipmentTypesPage.addNewTypeButton;
    await commonPageElements.clickElement(addNewTypeButton);
});

When(/^I check the data table headers are displayed and are correct for equipment types$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(equipmentTypesTableHeaderCells);
});

Then(/^I check the required error labels are displayed for equipment types$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new equipment type modal is closed$/, async () => {
    const newEquipmentTypeModal = await commonPageElements.modalContainer;
    await newEquipmentTypeModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new equipment type info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const mobility = data.mobility;
    const costPerHour = data.costPerHour;
    const weightLimit = data.weightLimit;
    const weightUoM = data.weightUoM;
    const heightLimit = data.heightLimit;
    const heightUoM = data.heightUoM;
    const heightMinimum = data.heightMinimum;
    const volumeLimit = data.volumeLimit;
    const volumeUoM = data.volumeUoM;
    const averageOperatingSpeed = data.averageOperatingSpeed;
    const speedUoM = data.speedUoM;
    const verticalSpeed = data.verticalSpeed;

    if (code !== undefined) {
        const equipmentTypeCodeToFill = code === "automationEquipmentTypeCode" ? randomEquipmentTypeCode : code;
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeCodeField, equipmentTypeCodeToFill);
    }
    if (label !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeLabelField, label);
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeDescriptionField, description);
    }
    if (mobility !== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentTypesPage.equipmentTypeMobilityDropdown, mobility);
    }
    if (costPerHour !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeCostPerHourField, costPerHour);
    }
    if (weightLimit !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeWeightLimitField, weightLimit);
    }
    if (weightUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await equipmentTypesPage.equipmentTypeWeightUoMDropdown, weightUoM,);
    }
    if (heightLimit !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeHeightLimitField, heightLimit);
    }
    if (heightUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await equipmentTypesPage.equipmentTypeHeightUoMDropdown, heightUoM);
    }
    if (heightMinimum !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeHeightMinimumField, heightMinimum);
    }
    if (volumeLimit !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeVolumeLimitField, volumeLimit);
    }
    if (volumeUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await equipmentTypesPage.equipmentTypeVolumeUoMDropdown, volumeUoM);
    }
    if (averageOperatingSpeed !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeAverageOperatingSpeedField, averageOperatingSpeed);
    }
    if (speedUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await equipmentTypesPage.equipmentTypeSpeedUoMDropdown, speedUoM);
    }
    if (verticalSpeed !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeVerticalSpeedField, verticalSpeed);
    }
});

Then(/^I verify that the previously saved equipment types info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const mobility = data.mobility;
    const costPerHour = data.costPerHour;
    const weightLimit = data.weightLimit;
    const weightUoM = data.weightUoM;
    const heightLimit = data.heightLimit;
    const heightUoM = data.heightUoM;
    const volumeLimit = data.volumeLimit;
    const volumeUoM = data.volumeUoM;
    const averageOperatingSpeed = data.averageOperatingSpeed;
    const speedUoM = data.speedUoM;
    const verticalSpeed = data.verticalSpeed;
    const currencyUoM = data.currencyUoM;
    await chrome.pause(5000); //UI delay
    if (code !== undefined) {
        const equipmentTypeCodeToCheck = code === "automationEquipmentTypeCode" ? randomEquipmentTypeCode.toUpperCase() : code.toUpperCase();
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "code", equipmentTypeCodeToCheck);
    }
    if (label !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "label", label)
    }
    if (description !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (mobility !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "mobility", mobility);
    }
    if (heightLimit !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "heightMax", heightLimit);
    }
    if (heightUoM !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "heightUOMCode", heightUoM);
    }
    if (weightLimit !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "weightMax", weightLimit);
    }
    if (weightUoM !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "weightUOMCode", weightUoM);
    }
    if (volumeLimit !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "volumeMax", volumeLimit);
    }
    if (volumeUoM !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "volumeUOMCode", volumeUoM);
    }
    if (averageOperatingSpeed !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "velocity", averageOperatingSpeed);
    }
    if (verticalSpeed !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "verticalVelocity", verticalSpeed);
    }
    if (speedUoM !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "velocityUOMCode", speedUoM);
    }
    if (costPerHour !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "cost", costPerHour);
    }
    if (currencyUoM !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "currency", currencyUoM);
    }
});


Then(/^I verify that the previously saved equipment type info is displayed on the edit equipment type form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'code', pageElement: equipmentTypesPage.equipmentTypeCodeField },
        { key: 'label', pageElement: equipmentTypesPage.equipmentTypeLabelField },
        { key: 'description', pageElement: equipmentTypesPage.equipmentTypeDescriptionField },
        { key: 'mobility', pageElement: equipmentTypesPage.equipmentTypeMobilityDropdown },
        { key: 'costPerHour', pageElement: equipmentTypesPage.equipmentTypeCostPerHourField },
        { key: 'weightLimit', pageElement: equipmentTypesPage.equipmentTypeWeightLimitField },
        { key: 'weightUoM', pageElement: equipmentTypesPage.equipmentTypeWeightUoMDropdown },
        { key: 'heightLimit', pageElement: equipmentTypesPage.equipmentTypeHeightLimitField },
        { key: 'heightUoM', pageElement: equipmentTypesPage.equipmentTypeHeightUoMDropdown },
        { key: 'heightMinimum', pageElement: equipmentTypesPage.equipmentTypeHeightMinimumField },
        { key: 'volumeLimit', pageElement: equipmentTypesPage.equipmentTypeVolumeLimitField },
        { key: 'volumeUoM', pageElement: equipmentTypesPage.equipmentTypeVolumeUoMDropdown },
        { key: 'averageOperatingSpeed', pageElement: equipmentTypesPage.equipmentTypeAverageOperatingSpeedField },
        { key: 'speedUoM', pageElement: equipmentTypesPage.equipmentTypeSpeedUoMDropdown },
        { key: 'verticalSpeed', pageElement: equipmentTypesPage.equipmentTypeVerticalSpeedField }
    ];

    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (field.key === 'code' && value === "automationEquipmentTypeCode") {
            value = randomEquipmentTypeCode.toUpperCase();
        }
        if (value !== undefined) {
            const inputValue = await field.pageElement.getValue();
            expect(inputValue).toEqual(value);
        }
    }
});

When(/^I filter by column: "(.*)" on the equipment types section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the equipment types term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await equipmentTypesPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationEquipmentTypeCode") {
            isMatch = await filterAndCheck(randomEquipmentTypeCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on equipment type term filter$/, async (term: string) => {
    if (term === "automationEquipmentTypeCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomEquipmentTypeCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the equipment types table$/, async () => {
    const noResultsLabel = await equipmentTypesPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test equipment types data$/, async () => {
    const equipmentTypeIds = await getEquipmentTypes.getAutomationEquipmentTypes();

    if (equipmentTypeIds.length === 0) {
        console.log("No equipment types found to delete.");
    } else {
        // Iterate over each equipment type ID and delete it
        for (const equipmentTypeId of equipmentTypeIds) {
            await deleteOneEquipmentType.deleteEquipmentType(equipmentTypeId);
            console.log(`Deleted equipment type with ID: ${equipmentTypeId}`);
        }
    }
});

When(/^I create an equipment type thru grahpql endpoint$/, async () => {
    await createOneEquipmentType.createAutomationEquipmentType();
});