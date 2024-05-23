import { When} from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);

const entityChangeHistoryTableHeaderCells = require('../../fixtures/headers/entityChangeHistoryHeaders.json');

When(/^I check the data table headers are displayed and are correct for entity change history$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(entityChangeHistoryTableHeaderCells);
});

