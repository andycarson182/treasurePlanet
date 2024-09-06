import { When } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { IntegrationLogsPage } from '../../../pageobjects/web/settings/integrationLogsPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements = new FilterElements(chrome, 'IntegrationLogs');
let integrationLogsPage = new IntegrationLogsPage(chrome);

const integrationLogsTableHeaderCells = require('../../../fixtures/headers/integrationLogsHeaders.json');

When(/^I check the data table headers are displayed and are correct for integration logs$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(integrationLogsTableHeaderCells);
});

When(/^I filter by column: "(.*)" on the integration logs section$/, async (option: string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({ timeout: 15000 });
    await commonPageElements.selectTypeaheadOption(filterByColumn, option);
});


When(/^I filter by text "(.*)" on the integration logs term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await integrationLogsPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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

