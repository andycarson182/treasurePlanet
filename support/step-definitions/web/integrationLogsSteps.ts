import { When } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);

const integrationLogsTableHeaderCells = require('../../fixtures/headers/integrationLogsHeaders.json');

When(/^I check the data table headers are displayed and are correct for integration logs$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(integrationLogsTableHeaderCells);
});

