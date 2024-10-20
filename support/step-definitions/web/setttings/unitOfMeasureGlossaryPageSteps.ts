import { When } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { UnitOfMeasureGlossaryPage } from '../../../pageobjects/web/settings/unitOfMeasureGlossaryPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'UnitOfMeasureGlossary');
let unitOfMeasureGlossaryPage = new UnitOfMeasureGlossaryPage(chrome)

const unitsOfMeasureGlossaryTableHeaderCells = require('../../../fixtures/headers/unitOfMeasureGlossaryHeaders.json');

When(/^I filter by column: "(.*)" on the unit of measure glossary section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I check the data table headers are displayed and are correct for units of measure glossary$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(unitsOfMeasureGlossaryTableHeaderCells);
});

When(/^I filter by text "(.*)" on the unit of measure glossary term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
       
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await unitOfMeasureGlossaryPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
