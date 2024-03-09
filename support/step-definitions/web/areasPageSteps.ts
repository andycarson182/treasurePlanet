import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { AreasPage } from '../../pageobjects/web/areasPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let areasPage = new AreasPage(chrome);

const areaTableHeaderCells = require('../../fixtures/headers/areasHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newAreaModal.json');
const randomAreaCode = `automationAreaCode-${Math.floor(100000 + Math.random() * 900000)}`;

When(/^I click add new area button$/, async () => {
    const addNewAreaButton = await areasPage.addNewAreaButton;
    await commonPageElements.clickElement(addNewAreaButton);
});

When(/^I click edit area button$/, async () => {
    const editAreaButton = await areasPage.editButton;
    await commonPageElements.clickElement(editAreaButton);
});

When(/^I check the data table headers are displayed and are correct for areas$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(areaTableHeaderCells);
});

Then(/^I check the required error labels are displayed for area creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new area modal is closed$/, async () => {
    const newAreaModal = await commonPageElements.modalContainer;
    await newAreaModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new area info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const name = data.name;
    const storageLocation = data.storageLocation;
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
    if (storageLocation !== undefined) {
        await commonPageElements.selectDropdownOption(await areasPage.areaStorageLocationDropdown, storageLocation);
    }
    if (status !== undefined) {
        await commonPageElements.selectDropdownOption(await areasPage.areaStatusDropdown, status);
    }
    if (targetTemperature !== undefined) {
        await commonPageElements.fillInField(await areasPage.areaTargetTemperatureField, targetTemperature);
    }
    if (issueNewStockSwitch !== undefined) {
        await commonPageElements.clickElement(await areasPage.issueNewStockSwitch);
    }
    if (receiveNewStockSwitch !== undefined) {
        await commonPageElements.clickElement(await areasPage.receiveNewStockSwitch);
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await areasPage.areaDescriptionField, description);;
    }
});

Then(/^I check the saved area info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const name = data.name;
    const storageLocation = data.storageLocation;
    const description = data.description;
    const issueNewStock = data.issueNewStock;
    const receiveNewStock = data.receiveNewStock;
    const status = data.status;
    const targetTemperature = data.targetTemperature;

    if (code !== undefined) {
        const areaCodeToCheck = code === "automationAreaCode" ? randomAreaCode.toUpperCase() : code.toUpperCase();
        await areasPage.checkExpectedLabelCellIs(row, "code", areaCodeToCheck);
    }
    if (name !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "name", name);
    }
    if (storageLocation !== undefined) {
        await areasPage.checkExpectedLabelCellIs(row, "storageLocation", storageLocation);
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

When(/^I filter by "(.*)" on areas term filter$/, async (term: string) => {
    if (term === "automationAreaCode") {
        await commonPageElements.fillFilterOnTerm(await areasPage.filterOnTermInput, randomAreaCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await areasPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the area table$/, async () => {
    const noResultsLabel = await areasPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});