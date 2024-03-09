import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { BinsPage } from '../../pageobjects/web/binsPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let binsPage = new BinsPage(chrome);

const binsTableHeaderCells = require('../../fixtures/headers/binsHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newBinModal.json');
const randomBinCode = `automationBinCode-${Math.floor(100000 + Math.random() * 900000)}`;

When(/^I click add new bin button$/, async () => {
    const addNewBinButton = await binsPage.addNewBinButton;
    await commonPageElements.clickElement(addNewBinButton);
});

When(/^I click edit bin button$/, async () => {
    const editBinButton = await binsPage.editButton;
    await commonPageElements.clickElement(editBinButton);
});

Then(/^I verify the new bin modal is closed$/, async () => {
    const newBinModal = await commonPageElements.modalContainer;
    await newBinModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I check the data table headers are displayed and are correct for bins$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(binsTableHeaderCells);
});

Then(/^I check the required error labels are displayed for bin creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

When(/^I fill in the new bin info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const binSizeCode = data.binSizeCode;
    const binCode = data.binCode;
    const areaCode = data.areaCode;
    const aisle = data.asile;
    const column = data.column;
    const level = data.level;
    const x = data.x;
    const y = data.y;
    const lastCountDate = data.lastCountDate;

    if (binSizeCode !== undefined) {
        await binsPage.selectBinSizeCode(binSizeCode);
    }
    if (binCode !== undefined) {
        const binCodeToFill = binCode === "automationBinCode" ? randomBinCode : binCode;
        await commonPageElements.fillInField(await binsPage.binCodeField, binCodeToFill);
    }
    if (areaCode !== undefined) {
        await commonPageElements.selectDropdownOption(await binsPage.binAreaDropdown, areaCode)
    }
    if (aisle !== undefined) {
        await commonPageElements.fillInField(await binsPage.binAisleField, aisle);
    }
    if (column !== undefined) {
        await commonPageElements.fillInField(await binsPage.binsColumnField, column);
    }
    if (level !== undefined) {
        await commonPageElements.fillInField(await binsPage.binsLevelField, level);
    }
    if (x !== undefined) {
        await commonPageElements.fillInField(await binsPage.binsXField, x);
    }
    if (y !== undefined) {
        await commonPageElements.fillInField(await binsPage.binsYField, y);
    }
    if (lastCountDate !== undefined) {
        await commonPageElements.fillInField(await binsPage.lastCountDateField, lastCountDate);
    }
});


Then(/^I check the saved bin info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const binCode: string = data.binCode;
    const status: string = data.status;
    const removal: string = data.removal;
    const placement: string = data.placement;
    const zone: string = data.zone;
    const areaCode: string = data.areaCode;
    const level: string = data.level;
    const verificationCode: string = data.verificationCode;
    const x: string = data.x;
    const y: string = data.y;
    const lastMovement: string = data.lastMovement;
    const lastCountDate: string = data.lastCountDate;
    const hasOpenTasks: string = data.hasOpenTasks;
    const containsProducts: string = data.containsProducts;
    const binSizeCode: string = data.binSizeCode;
    const weightCapacity = data.weightCapacity;
    const depth = data.depth;
    const width = data.width;
    const height = data.height;


    if (binSizeCode !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeCode", binSizeCode);
    }
    if (binCode !== undefined) {
        const binCodeToCheck = binCode === "automationBinCode" ? randomBinCode.toUpperCase() : binCode.toUpperCase();
        await binsPage.checkExpectedLabelCellIs(row, "code", binCodeToCheck);
    }
    if (status !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "inactive", status);
    }
    if (removal !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "sourceBinBlock", removal);
    }
    if (placement !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "destinationBinBlock", placement);
    }
    if (zone !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "zoneCode", zone);
    }
    if (areaCode !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "areaCode", areaCode);
    }
    if (level !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "level", level);
    }
    if (verificationCode !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "verificationCode", verificationCode);
    }
    if (x !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "x", x);
    }
    if (y !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "y", y);
    }
    if (lastMovement !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "lastMovement", lastMovement);
    }
    if (lastCountDate !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "lastCount", lastCountDate);
    }
    if (hasOpenTasks !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "hasOpenTasks", hasOpenTasks);
    }
    if (containsProducts !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "containsProducts", containsProducts);
    }
    if (weightCapacity !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeWeightCapacity", weightCapacity);
    }
    if (depth !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeDepth", depth);
    }
    if (width !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeWidth", width);
    }
    if (height !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeHeight", height);
    }
});

When(/^I filter by "(.*)" on bins term filter$/, async (term: string) => {
    if (term === "automationBinCode") {
        await commonPageElements.fillFilterOnTerm(await binsPage.filterOnTermInput, randomBinCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await binsPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the bins table$/, async () => {
    const noResultsLabel = await binsPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});



