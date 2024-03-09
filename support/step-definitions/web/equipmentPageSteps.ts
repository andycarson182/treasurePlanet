import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { EquipmentPage } from '../../pageobjects/web/equipmentPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let equipmentPage = new EquipmentPage(chrome);

const equipmentTableHeaderCells = require('../../fixtures/headers/equipmentHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newEquipmentModal.json');
const randomEquipmentCode = `automationEquipmentCode-${Math.floor(100000 + Math.random() * 900000)}`;

When(/^I click add new equipment button$/, async () => {
    const addNewEquipmentButton = await equipmentPage.addNewEquipmentButton;
    await commonPageElements.clickElement(addNewEquipmentButton);
});

When(/^I click edit equipment button$/, async () => {
    const editEquipmentButton = await equipmentPage.editButton;
    await commonPageElements.clickElement(editEquipmentButton);
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
        await commonPageElements.fillInField(await equipmentPage.equipmentCodeField,equipmentCodeToFill);
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
    if (model!== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentPage.equipmentModelDropdown, model);
    }
    if (tagId!== undefined) {
        await commonPageElements.fillInField(await equipmentPage.equipmentTagIdField, tagId);
    }
});

Then(/^I check the saved equipment info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const status = data.status;
    const type = data.type;
    const model = data.model;
    const tagId = data.tagId;

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

When(/^I filter by "(.*)" on equipment term filter$/, async (term: string) => {
    if (term === "automationEquipmentCode") {
        await commonPageElements.fillFilterOnTerm(await equipmentPage.filterOnTermInput, randomEquipmentCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await equipmentPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the equipment table$/, async () => {
    const noResultsLabel = await equipmentPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});