import { When, Then, DataTable} from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { EquipmentModelsPage } from '../../pageobjects/web/equipmentModelsPage';
import { randomEquipmentModelCode } from '../../utilities/randomDataGenerator';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let equipmentModelsPage = new  EquipmentModelsPage (chrome);

const equipmentModelsTableHeaderCells = require('../../fixtures/headers/equipmentModelsHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newEquipmentModelModal.json');


When(/^I click add new model button$/, async () => {
    const addNewModelButton = await equipmentModelsPage.addNewModelButton;
    await commonPageElements.clickElement(addNewModelButton);
});

When(/^I click edit equipment model button$/, async () => {
    const editEquipmentModelButton = await equipmentModelsPage.editButton;
    await commonPageElements.clickElement( editEquipmentModelButton);
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

    if (equipmentType!== undefined) {
        await commonPageElements.selectDropdownOption(await equipmentModelsPage.equipmentModelEquipmentTypeDropdown, equipmentType);
    }
    if (code !== undefined) {
        const equipmentModelCodeToFill = code === "automationEquipmentModelCode" ? randomEquipmentModelCode : code;
        await commonPageElements.fillInField(await equipmentModelsPage.equipmentModelCodeField,  equipmentModelCodeToFill);
    }
    if (label !== undefined) {
        await commonPageElements.fillInField(await equipmentModelsPage.equipmentModelLabelField, label);
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await equipmentModelsPage.equipmentModelDescription, description);
    }
});

Then(/^I check the saved equipment models info is displayed on the table as follows$/, async function (dataTable: DataTable) {
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


When(/^I filter by "(.*)" on equipment model term filter$/, async (term: string) => {
    if (term === "automationEquipmentModelCode") {
        await commonPageElements.fillFilterOnTerm(await equipmentModelsPage.filterOnTermInput, randomEquipmentModelCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await equipmentModelsPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the equipment models table$/, async () => {
    const noResultsLabel = await equipmentModelsPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});
