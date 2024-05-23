import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { EquipmentTypesPage } from '../../pageobjects/web/equipmentTypesPage';
import { randomEquipmentTypeCode } from '../../utilities/randomDataGenerator';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let equipmentTypesPage = new EquipmentTypesPage(chrome);

const equipmentTypesTableHeaderCells = require('../../fixtures/headers/equipmentTypesHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newEquipmentTypeModal.json');


When(/^I click add new type button$/, async () => {
    const addNewTypeButton = await equipmentTypesPage.addNewTypeButton;
    await commonPageElements.clickElement(addNewTypeButton);
});

When(/^I click edit equipment type button$/, async () => {
    const editEquipmentTypeButton = await equipmentTypesPage.editButton;
    await commonPageElements.clickElement(editEquipmentTypeButton);
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
    const speed = data.speed;
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
    if (speed !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeSpeedField, speed);
    }
    if (speedUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await equipmentTypesPage.equipmentTypeSpeedUoMDropdown, speedUoM);
    }
    if (verticalSpeed !== undefined) {
        await commonPageElements.fillInField(await equipmentTypesPage.equipmentTypeVerticalSpeedField, verticalSpeed);
    }
});

Then(/^I check the saved equipment types info is displayed on the table as follows$/, async function (dataTable: DataTable) {
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
    const speed = data.speed;
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
    if (speed !== undefined) {
        await equipmentTypesPage.checkExpectedLabelCellIs(row, "velocity", speed);
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


When(/^I filter by "(.*)" on equipment type term filter$/, async (term: string) => {
    if (term === "automationEquipmentTypeCode") {
        await commonPageElements.fillFilterOnTerm(await equipmentTypesPage.filterOnTermInput, randomEquipmentTypeCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await equipmentTypesPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the equipment types table$/, async () => {
    const noResultsLabel = await equipmentTypesPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});
