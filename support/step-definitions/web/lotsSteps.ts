import { When} from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);

const lotsTableHeaderCells = require('../../fixtures/headers/lotsHeaders.json');

When(/^I check the data table headers are displayed and are correct for lots$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(lotsTableHeaderCells);
});

