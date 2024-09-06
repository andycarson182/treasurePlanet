import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { ZonesPage } from '../../../pageobjects/web/settings/zonesPage';
import { randomZoneCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneZone } from '../../../rest/deleteEndpoints/deleteOneZone';
import { CreateOneZone } from '../../../rest/createEndpoints/createOneZone';
import { GetZones } from '../../../rest/getEndpoints/getZones';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'ZoneSettings');
let zonesPage = new ZonesPage(chrome);
const deleteOneZone = new DeleteOneZone();
const getZones = new GetZones();
const createOneZone = new CreateOneZone();

const zonesTableHeaderCells = require('../../../fixtures/headers/zonesHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newZoneModal.json');


When(/^I click add new zone button$/, async () => {
    const addNewZoneButton = await zonesPage.addNewZoneButton;
    await commonPageElements.clickElement(addNewZoneButton);
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
});

When(/^I fill in the optimize info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const behaviorUnitOfMeasureRestrictions = data.behaviorUnitOfMeasureRestrictions;
    const behaviors = data.behaviors;
    const uomRestrictions = data.uomRestrictions;

    if (behaviorUnitOfMeasureRestrictions !== undefined) {
        const behaviorUnitOfMeasureRadioOption = await zonesPage.getBehaviorUnitOfMeasureRadioButton(behaviorUnitOfMeasureRestrictions);
        behaviorUnitOfMeasureRadioOption.click();
    }
    if (behaviors !== undefined) {
        const behaviorsTypeAHead = await zonesPage.zoneBehaviorsTypeAHead;
        await behaviorsTypeAHead.clearValue();
        await commonPageElements.selectTypeaheadOption(behaviorsTypeAHead, behaviors)
    }
    if (uomRestrictions !== undefined) {
        const uomRestrictionsTypeAhead = await zonesPage.uomRestrictionsTypeAhead;
        await uomRestrictionsTypeAhead.clearValue();
        await commonPageElements.selectTypeaheadOption(uomRestrictionsTypeAhead, uomRestrictions);
    }
});


Then(/^I verify that the previously saved zone info is displayed on the table as follows$/, async function (dataTable: DataTable) {
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
    const pickingUoMRestrictions = data.pickingUoMRestrictions;
    const putawayUoMRestrictions = data.putawayUoMRestrictions;
    const replenishmentUoMRestrictions = data.replenishmentUoMRestrictions;

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
    if (pickingUoMRestrictions !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "pickingUomRestrictionLabels", pickingUoMRestrictions);
    }
    if (putawayUoMRestrictions !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "putawayUomRestrictionLabels", putawayUoMRestrictions);
    }
    if (replenishmentUoMRestrictions !== undefined) {
        await zonesPage.checkExpectedLabelCellIs(row, "replenishmentUomRestrictionLabels", replenishmentUoMRestrictions);
    }
});

Then(/^I verify that the previously saved zone info is displayed on the edit zone form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'code', pageElement: zonesPage.zoneCodeField },
        { key: 'name', pageElement: zonesPage.zoneNameField },
        { key: 'description', pageElement: zonesPage.zoneDescriptionField }
    ];
    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (field.key === 'code' && value === "automationZoneCode") {
            value = randomZoneCode.toUpperCase();
        }
        if (value !== undefined) {
            const inputValue = await field.pageElement.getValue();
            expect(inputValue).toEqual(value);
        }
    }
});

Then(/^I verify that the previously saved optimized info is displayed on the edit zone form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const behaviorUnitOfMeasureRestrictions = data.behaviorUnitOfMeasureRestrictions;
    const behaviours = data.behaviours;
    const uomRestrictions = data.uomRestrictions;

    await chrome.pause(5000); // UI delay


    if (behaviorUnitOfMeasureRestrictions !== undefined) {
        const behaviorUnitOfMeasureRadioButtonOption = await zonesPage.getBehaviorUnitOfMeasureRadioButton(behaviorUnitOfMeasureRestrictions);
        const isSelected = await behaviorUnitOfMeasureRadioButtonOption.isSelected();
        expect(isSelected).toBe(true);
    } else {
        throw new Error("No valid Option");
    }
    if (behaviours !== undefined) {
        const inputValue = await zonesPage.zoneBehaviorsTypeAHead.getValue();
        expect(inputValue).toEqual(behaviours);
    }
    if (uomRestrictions  !== undefined) {
        const inputValue = await zonesPage.uomRestrictionsTypeAhead.getValue();
        expect(inputValue).toEqual(uomRestrictions);
    }
});

When(/^I filter by column: "(.*)" on the zones section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the zones term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {

        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await zonesPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationZoneCode") {
            isMatch = await filterAndCheck(randomZoneCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on zone term filter$/, async (term: string) => {
    if (term === "automationZoneCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomZoneCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the zones table$/, async () => {
    const noResultsLabel = await zonesPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

Then(/^I delete the picking uom "(.*)"$/, async (pickingUoM:string) => {
    const selectedPickingUoM = await browser.$(`//span[contains(text(), "${pickingUoM}")]`);
    await selectedPickingUoM .waitForDisplayed();
    await selectedPickingUoM .moveTo();
   const pickingUoMDeleteIcon = await zonesPage.deleteIconPickingUoMRestrictionsField;
   pickingUoMDeleteIcon.click();
});


When(/^I remove all test zones$/, async () => {
    const zoneIds = await getZones.getAutomationZones();

    if (zoneIds.length === 0) {
        console.log("No zones found to delete.");
    } else {
        // Iterate over each zone ID and delete the zone
        for (const zoneId of zoneIds) {
            await deleteOneZone.deleteZone(zoneId);
            console.log(`Deleted zone with ID: ${zoneId}`);
        }
    }
});

When(/^I create a zone thru grahpql endpoint$/, async () => {
    await createOneZone.createAutomationZone();
});

