import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { RuleSetsPage } from '../../../pageobjects/web/slotting/ruleSetsPage';
import { DeleteOneRuleSet } from '../../../rest/deleteEndpoints/deleteOneRuleSet';
import { CreateOneRuleSet } from '../../../rest/createEndpoints/createOneRuleSet';
import { GetRuleSets } from '../../../rest/getEndpoints/getRuleSets';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'Rulesets');
let ruleSetsPage = new RuleSetsPage(chrome);
const deleteOneRuleSet = new DeleteOneRuleSet();
const getRuleSets = new GetRuleSets();
const createOneRuleSet = new CreateOneRuleSet();

const tableHeaderCells = require('../../../fixtures/headers/ruleSetsHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newRuleSetModal.json');

When(/^I click create new rule set button$/, async () => {
    const createNewRuleSetButton = await ruleSetsPage.createNewRuleSetButton;
    await commonPageElements.clickElement(createNewRuleSetButton);
});

When(/^I check the data table headers are displayed and are correct for rule sets$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(tableHeaderCells);
});

When(/^I select "(.*)" action option in rule sets$/, async (actionOption: string) => {
    await ruleSetsPage.selectActioninMenuOption(actionOption);
});

Then(/^I verify the new rule set modal is closed$/, async () => {
    const newRuleSetModal = await commonPageElements.modalContainer;
    await newRuleSetModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

Then(/^I check the required error labels are displayed for rule set creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

When(/^I fill in the general rule set info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldActions = {
        name: async () => {
            await commonPageElements.fillInField(await ruleSetsPage.generalNameField, data.name);
        },
        maxMovements: async () => {
            await commonPageElements.fillInField(await ruleSetsPage.maxMovements, data.maxMovements);
        },
        timeFrame: async () => {
            if (data.timeFrame === "Historical Orders") {
                const timeFrameRadioButtonOption = await ruleSetsPage.getTimeFrameRadioButtonOption(1);
                await timeFrameRadioButtonOption.click();
            } else if (data.timeFrame === "Future Demand") {
                const timeFrameRadioButtonOption = await ruleSetsPage.getTimeFrameRadioButtonOption(2);
                await timeFrameRadioButtonOption.click();
            } else {
                throw new Error("No valid Option");
            }
        }
    };

    for (const [key, action] of Object.entries(fieldActions)) {
        if (data[key] !== undefined) {
            await action();
        }
    }
});

When(/^I fill in the abc analysis criteria rule set info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldActions = {
        abcAnalysis: async () => {
            if (data.abcAnalysis === "Use ABC Analysis") {
                const abcAnalysisCriteriaRadiButtonOption = await ruleSetsPage.getAbcAnalysisCriteriaRadiButtonOption(1);
                await abcAnalysisCriteriaRadiButtonOption.click();
            } else if (data.abcAnalysis === "Skip ABC Analysis") {
                const abcAnalysisCriteriaRadiButtonOption = await ruleSetsPage.getAbcAnalysisCriteriaRadiButtonOption(2);
                await abcAnalysisCriteriaRadiButtonOption.click();
            } else {
                throw new Error("No valid Option");
            }
        },
        abcCriteria: async () => {
            await commonPageElements.selectDropdownOption(await ruleSetsPage.abcCriteriaDropdown, data.abcCriteria);
        },
        aPercentage: async () => {
            await commonPageElements.fillInField(await ruleSetsPage.aIndicatorPercentageInput, data.aPercentage);
        },
        bPercentage: async () => {
            await commonPageElements.fillInField(await ruleSetsPage.bIndicatorPercentageInput, data.bPercentage);
        },
        cPercentage: async () => {
            await commonPageElements.fillInField(await ruleSetsPage.cIndicatorPercentageInput, data.cPercentage);
        }
    };

    for (const [key, action] of Object.entries(fieldActions)) {
        if (data[key] !== undefined) {
            await action();
        }
    }
});

When(/^I fill in the warehouse restrictions rule set info$/, async function (dataTable: DataTable) {
    const rows = dataTable.hashes();

    for (const data of rows) {
        await handleWarehouseRestriction(data as { warehouseRestriction: string });
    }
});

async function handleWarehouseRestriction(data: { warehouseRestriction: string }) {
    const action = async () => {
        if (data.warehouseRestriction === "FIFO Picking") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(1);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "FEFO/FIFO Picking") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(2);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "Heaviest To Lightest Picks") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(3);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "Enforce Single Order Picks") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(4);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "Prevent Mixed Products In Bins") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(5);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "Prevent Mixed Lots In Bins") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(6);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "Prevent Mixed Expiration Dates In Bins") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(7);
            await warehouseRestrictionOption.click();
        } else if (data.warehouseRestriction === "Restrict Distance") {
            const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(8);
            await warehouseRestrictionOption.click();
        } else {
            throw new Error(`No valid Option for ${data.warehouseRestriction}`);
        }
    };

    await action();
}

When(/^I fill in the warehouse weights rule set info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldMappings = {
        pickDensity: ruleSetsPage.pickDensityInput,
        pickEfficiency: ruleSetsPage.pickEfficiencyInput,
        avoidCongestion: ruleSetsPage.avoidCongestionInput,
        favorGroundLevel: ruleSetsPage.favorGroundLevelInput,
        putawayDensity: ruleSetsPage.putawayDensityInput,
        putawayEfficiency: ruleSetsPage.putawayEfficiencyInput
    };

    for (const [key, field] of Object.entries(fieldMappings)) {
        if (data[key] !== undefined) {
            await commonPageElements.fillInField(await field, data[key]);
        }
    }
});

Then(/^I verify that the previously saved rule set info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row
    const ruleSet = data.ruleset;
    const status = data.status;
    const lastUpdated = data.lastUpdated;
    const runCount = data.runCount;
    const createdBy = data.createdBy;

    await chrome.pause(5000); //UI delay
    if (ruleSet !== undefined) {
        await ruleSetsPage.checkExpectedLabelCellIs(row, "name", ruleSet);
    }
    if (status !== undefined) {
        await ruleSetsPage.checkExpectedLabelCellIs(row, "rulesetStatus", status);
    }
    if (lastUpdated !== undefined) {
        await ruleSetsPage.checkExpectedLabelCellIs(row, "lastUpdated", lastUpdated);
    }
    if (runCount !== undefined) {
        await ruleSetsPage.checkExpectedLabelCellIs(row, "runCount", runCount);
    }
    if (createdBy !== undefined) {
        await ruleSetsPage.checkExpectedLabelCellIs(row, "createdBy", createdBy);
    }
});

Then(/^I verify that the previously saved rule set detail info is displayed on the rule set detail page$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const name = data.abcAnalysis;
    const runCount = data.abcCriteria;
    const createdBy = data.aPercentage;
    const lastUpdated = data.bPercentage;
    if (name !== undefined) {
        const inputValue = await ruleSetsPage.ruleSetDetailname.getValue();
        expect(inputValue).toEqual(name);
    }
    if (runCount !== undefined) {
        const inputValue = await ruleSetsPage.ruleSetDetailRunCount.getValue();
        expect(inputValue).toEqual(runCount);
    }
    if (createdBy !== undefined) {
        const inputValue = await ruleSetsPage.ruleSetDetailCreatedBy.getValue();
        expect(inputValue).toEqual(createdBy);
    }
    if (lastUpdated !== undefined) {
        const inputValue = await ruleSetsPage.ruleSetDetailLastUpdate.getValue();
        expect(inputValue).toEqual(lastUpdated);
    }
});

Then(/^I verify that the previously saved rule set general info is displayed on the rule set (detail page|modal)$/, async function (_, dataTable: DataTable) {//_ to indicate that the variable is intentionally unused:
    const data = dataTable.hashes()[0];
    const name = data.name;
    const maxMovements = data.maxMovements;
    const timeFrame = data.timeFrame;

    if (name !== undefined) {
        const inputValue = await ruleSetsPage.generalNameField.getValue();
        expect(inputValue).toEqual(name);
    }
    if (maxMovements !== undefined) {
        const inputValue = await ruleSetsPage.maxMovements.getValue();
        expect(inputValue).toEqual(maxMovements);
    }
    if (timeFrame !== undefined) {
        if (data.timeFrame === "Historical Orders") {
            const timeFrameRadioButtonOption = await ruleSetsPage.getTimeFrameRadioButtonOption(1);
            const isSelected = await timeFrameRadioButtonOption.isSelected();
            expect(isSelected).toBe(true);
        } else if (data.timeFrame === "Future Demand") {
            const timeFrameRadioButtonOption = await ruleSetsPage.getTimeFrameRadioButtonOption(2);
            const isSelected = await timeFrameRadioButtonOption.isSelected();
            expect(isSelected).toBe(true);
        } else {
            throw new Error("No valid Option");
        }
    }
});

Then(/^I verify that the previously saved abc analysis criteria rule set info is displayed on the rule set (detail page|modal)$/, async function (_, dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const abcAnalysis = data.abcAnalysis;
    const abcCriteria = data.abcCriteria;
    const aPercentage = data.aPercentage;
    const bPercentage = data.bPercentage;
    const cPercentage = data.cPercentage
    if (abcAnalysis === "Use ABC Analysis") {
        const abcAnalysisCriteriaRadiButtonOption = await ruleSetsPage.getAbcAnalysisCriteriaRadiButtonOption(1);
       const isSelected = await abcAnalysisCriteriaRadiButtonOption.isSelected();
        expect(isSelected).toBe(true);
    } else if (abcAnalysis === "Skip ABC Analysis") {
        const abcAnalysisCriteriaRadiButtonOption = await ruleSetsPage.getAbcAnalysisCriteriaRadiButtonOption(2);
        const isSelected = await abcAnalysisCriteriaRadiButtonOption.isSelected();
        expect(isSelected).toBe(true);
    } else {
        throw new Error("No valid Option");
    }
    if (abcCriteria !== undefined) {
        const selectedOption = await ruleSetsPage.abcCriteriaDropdown.$('option:checked');
        const inputValue = await selectedOption.getText();
        expect(inputValue).toEqual(abcCriteria);
    }
    if (aPercentage !== undefined) {
        const inputValue = await ruleSetsPage.aIndicatorPercentageInput.getValue();
        expect(inputValue).toEqual(aPercentage);
    }
    if (bPercentage !== undefined) {
        const inputValue = await ruleSetsPage.bIndicatorPercentageInput.getValue();
        expect(inputValue).toEqual(bPercentage);
    }
    if (cPercentage !== undefined) {
        const inputValue = await ruleSetsPage.cIndicatorPercentageInput.getValue();
        expect(inputValue).toEqual(cPercentage);
    }
});


Then(/^I verify that the previously saved warehouse restrictions info is displayed on the rule set (detail page|modal)$/, async function (_, dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const warehouseRestriction = data.warehouseRestriction;

    const checkOptionSelected = async (index: any) => {
        const warehouseRestrictionOption = await ruleSetsPage.getWarehouseRestrictionOption(index);
        const className = await warehouseRestrictionOption.getAttribute('class');
        const isSelected = className.includes('Mui-checked');
        expect(isSelected).toBe(true);
    };

    switch (warehouseRestriction) {
        case "FIFO Picking":
            await checkOptionSelected(1);
            break;
        case "FEFO/FIFO Picking":
            await checkOptionSelected(2);
            break;
        case "Heaviest To Lightest Picks":
            await checkOptionSelected(3);
            break;
        case "Enforce Single Order Picks":
            await checkOptionSelected(4);
            break;
        case "Prevent Mixed Products In Bins":
            await checkOptionSelected(5);
            break;
        case "Prevent Mixed Lots In Bins":
            await checkOptionSelected(6);
            break;
        case "Prevent Mixed Expiration Dates In Bins":
            await checkOptionSelected(7);
            break;
        case "Restrict Distance":
            await checkOptionSelected(8);
            break;
        default:
            throw new Error(`No valid Option for ${data.warehouseRestriction}`);
    }
});

Then(/^I verify that the previously saved warehouse weights rule set info is displayed on the rule set (detail page|modal)$/, async function (_, dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldsToCheck = [
        { key: 'pickDensity', element: ruleSetsPage.pickDensityInput },
        { key: 'pickEfficiency', element: ruleSetsPage.pickEfficiencyInput },
        { key: 'avoidCongestion', element: ruleSetsPage.avoidCongestionInput },
        { key: 'favorGroundLevel', element: ruleSetsPage.favorGroundLevelInput },
        { key: 'putawayDensity', element: ruleSetsPage.putawayDensityInput },
        { key: 'putawayEfficiency', element: ruleSetsPage.putawayEfficiencyInput }
    ];

    for (const field of fieldsToCheck) {
        const expectedValue = data[field.key];
        if (expectedValue !== undefined) {
            const inputValue = await field.element.getValue();
            expect(inputValue).toEqual(expectedValue);
        }
    }
});

When(/^I filter by column: "(.*)" on the rule sets section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the rule sets term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {

        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await ruleSetsPage.checkExpectedLabelCellIs("1", "name", expectedValue);
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
        isMatch = await filterAndCheck(term);
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on rule sets term filter$/, async (term: string) => {
    await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
});

When(/^I select the rule sets checkbox in the row position "(.*)"$/, async (row) => {
    const cellElement = await ruleSetsPage.getRuleSetsTableCell(row, 'selection');
    await cellElement.click();
});

When(/^I select the rule set in the position "(.*)"$/, async (row) => {
    const cellElement = await ruleSetsPage.getRuleSetsTableCell(row, 'name');
    await cellElement.click();
});

Then(/^I verify "no results" is displayed on the rule sets table$/, async () => {
    const noResultsLabel = await ruleSetsPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

Then(/^I verify the error message: "(.*)" is displayed$/, async (expectedMessage: string) => {
    const errorMessage = await ruleSetsPage.errorMessage;
    expect(await errorMessage.getText()).toEqual(expectedMessage);
});

When(/^I remove all test rule sets$/, async () => {
    const ruleSetIds = await getRuleSets.getAutomationRuleSets();

    if (ruleSetIds.length === 0) {
        console.log("No rule sets found to delete.");
    } else {
        // Iterate over each rule set ID and delete the rule set
        for (const ruleSetId of ruleSetIds) {
            await deleteOneRuleSet.deleteRuleSet(ruleSetId);
            console.log(`Deleted rule set with ID: ${ruleSetId}`);
        }
    }
});

When(/^I create a rule set thru grahpql endpoint$/, async () => {
    await createOneRuleSet.createAutomationRuleSet();
});