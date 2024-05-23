import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { ZonesPage } from '../../pageobjects/web/zonesPage';
import { randomZoneCode } from '../../utilities/randomDataGenerator';
import { DeleteOneZone } from '../../rest/deleteOneZone';
import { CreateZone } from '../../rest/createOnezone';
import { Zones } from '../../rest/zones';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let zonesPage = new ZonesPage(chrome);
const deleteOneZone = new DeleteOneZone();
const zones = new Zones();
const createZone = new CreateZone();

const zonesTableHeaderCells = require('../../fixtures/headers/zonesHeaders.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newZoneModal.json');


When(/^I click add new zone button$/, async () => {
    const addNewZoneButton = await zonesPage.addNewZoneButton;
    await commonPageElements.clickElement(addNewZoneButton);
});

When(/^I click edit zone button$/, async () => {
    const editZoneButton = await zonesPage.editButton;
    await commonPageElements.clickElement(editZoneButton);
});

When(/^I check the data table headers are displayed and are correct for zones$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(zonesTableHeaderCells);
});

Then(/^I check the required error labels are displayed for zone creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new zone modal is closed$/, async () => {
    const newZoneModal = await commonPageElements.modalContainer;
    await newZoneModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new zone info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const name = data.name;
    const description = data.description;
    const pickingUoMRestrictions = data.pickingUoMRestrictions;

    if (code !== undefined) {
        const zoneCodeToFill = code === "automationZoneCode" ? randomZoneCode : code;
        await commonPageElements.fillInField(await zonesPage.zoneCodeField, zoneCodeToFill);
    }
    if (name !== undefined) {
        await commonPageElements.fillInField(await zonesPage.zoneNameField, name);
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await zonesPage.zoneDescriptionField, description);
    }
    if (pickingUoMRestrictions !== undefined) {
        await zonesPage.selectPickingUoMRestrictions(pickingUoMRestrictions)
    }
});

Then(/^I check the saved zone info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const name = data.name;
    const description = data.description;
    const warehouse = data.warehouse;
    const areaCount = data.areaCount;
    const aisleCount = data.aislecount
    const columnCount = data.columnCount;
    const binCount = data.binCount;
    const uoMRestrictions = data.uoMRestrictions;

    await chrome.pause(5000); //UI delay
    if (code !== undefined) {
        const zoneCodeToCheck = code === "automationZoneCode" ? randomZoneCode.toUpperCase() : code.toUpperCase();
        await zonesPage.checkExpectedLabelCellIs(row, "code", zoneCodeToCheck);
    }
    if (name !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "name", name)
    }
    if (description !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (warehouse !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "warehouseName", warehouse);
    }
    if (areaCount !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "areaCount", areaCount);
    }
    if (aisleCount !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "aisleCount", aisleCount);
    }
    if (columnCount !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "aisleColumnCount", columnCount);
    }
    if (binCount !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "binCount", binCount);
    }
    if (uoMRestrictions !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "uomRestrictionLabel", uoMRestrictions);
    }
});


When(/^I filter by "(.*)" on zone term filter$/, async (term: string) => {
    if (term === "automationZoneCode") {
        await commonPageElements.fillFilterOnTerm(await zonesPage.filterOnTermInput, randomZoneCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await zonesPage.filterOnTermInput, term);
    }
});

Then(/^I verify "no results" is displayed on the zones table$/, async () => {
    const noResultsLabel = await zonesPage.NoResultsLabel;
    await noResultsLabel.isDisplayed();
});


When(/^I remove all test zones$/, async () => {
    const zoneIds = await zones.getAutomationZones();

    if (zoneIds.length === 0) {
        console.log("No zones found to delete.");
    } else {
        // Iterate over each zone ID and delete the zonea
        for (const zoneId of zoneIds) {
            await deleteOneZone.deleteZone(zoneId);
            console.log(`Deleted zone with ID: ${zoneId}`);
        }
    }
});

When(/^I create a zone thru grahpql endpoint$/, async () => {
    await createZone.createAutomationZone();
});

