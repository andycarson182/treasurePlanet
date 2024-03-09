import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { BinSizesPage } from '../../pageobjects/web/binSizesPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let binSizesPage = new BinSizesPage(chrome);

const binSizesTableHeaderCells = require('../../fixtures/headers/binSizesHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newBinSizeModal.json');
const randomBinSizeCode = `automationBinSizeCode-${Math.floor(100000 + Math.random() * 900000)}`;

When(/^I click add new bin size button$/, async () => {
    const addNewBinSizeButton = await binSizesPage.addNewBinSizeButton;
    await commonPageElements.clickElement(addNewBinSizeButton);
});

When(/^I click edit bin size button$/, async () => {
    const editBinSizeButton = await binSizesPage.editButton;
    await commonPageElements.clickElement(editBinSizeButton);
});

Then(/^I verify the new bin size modal is closed$/, async () => {
    const newBinSizeModal = await commonPageElements.modalContainer;
    await newBinSizeModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I check the data table headers are displayed and are correct for bin sizes$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(binSizesTableHeaderCells);
});

Then(/^I check the required error labels are displayed for bin size creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

When(/^I fill in the new bin size info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const weightUoM = data.weightUoM;
    const weightCapacity = data.weightCapacity;
    const dimensionUoM = data.dimensionUoM;
    const depth = data.depth;
    const width = data.width;
    const height = data.height;

    if (code !== undefined) {
        const binSizeCodeToFill = code === "automationBinSizeCode" ? randomBinSizeCode : code;
        await commonPageElements.fillInField(await binSizesPage.binSizeCodeField, binSizeCodeToFill);
    }
    if (label !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeLabelField, label)
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeDescriptionField, description);
    }
    if (weightUoM !== undefined) {
        await binSizesPage.selectWeightUoM(weightUoM)
    }
    if (weightCapacity !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeWeightCapacityField, weightCapacity);
    }
    if (dimensionUoM !== undefined) {
        await binSizesPage.selectDimensionUoMOption(dimensionUoM)
    }
    if (depth !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeDepthField, depth);
    }
    if (width !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeWidthField, width);
    }
    if (height !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeHeightField, height);
    }
    await chrome.pause(8000)
});


Then(/^I check the saved bin size info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const weightUoM = data.weightUoM;
    const weightCapacity = data.weightCapacity;
    const dimensionUoM = data.dimensionUoM;
    const depth = data.depth;
    const width = data.width;
    const height = data.height;
    const productSizeRestriction = data.productSizeRestriction;
    const createdByFirstName = data.createdByFirstName;
    const createdByLastName = data.createdByLastName;


    if (code !== undefined) {
        const binSizeCodeToCheck = code === "automationBinSizeCode" ? randomBinSizeCode.toUpperCase() : code.toUpperCase();
        await binSizesPage.checkExpectedLabelCellIs(row, "code", binSizeCodeToCheck);
    }
    if (label !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "label", label);
    }
    if (description !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (weightUoM !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "weightCapacityUomCode", weightUoM );
    }
    if (weightCapacity !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "weightCapacity", weightCapacity);
    }
    if (dimensionUoM!== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "distanceUomCode", dimensionUoM);
    }
    if (depth !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "depth", depth);
    }
    if (width !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "width", width);
    }
    if (height !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "height", height);
    }
    if ( productSizeRestriction !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "productSizeRestriction",productSizeRestriction);
    }
    if (createdByFirstName !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "createdByUserFirstName", createdByFirstName);
    }
    if (createdByLastName !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "createdByUserLastName",createdByLastName);
    }
});

When(/^I filter by "(.*)" on bin sizes term filter$/, async (term: string) => {
    if (term === "automationBinSizeCode") {
        await commonPageElements.fillFilterOnTerm(await binSizesPage.filterOnTermInput, randomBinSizeCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await binSizesPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the bin sizes table$/, async () => {
    const noResultsLabel = await binSizesPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});



