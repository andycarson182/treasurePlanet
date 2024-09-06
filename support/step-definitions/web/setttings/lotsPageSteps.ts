import { When} from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { LotsPage } from '../../../pageobjects/web/settings/lotsPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let lotsPage = new LotsPage(chrome);
let filterElements= new FilterElements(chrome, 'LotSettings');
const lotsTableHeaderCells = require('../../../fixtures/headers/lotsHeaders.json');

When(/^I filter by column: "(.*)" on the lots section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I check the data table headers are displayed and are correct for lots$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(lotsTableHeaderCells);
});

When(/^I filter by text "(.*)" on the lots term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
       
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await lotsPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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