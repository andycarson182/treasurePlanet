import { When} from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);

const unitsOfMeasureGlossaryTableHeaderCells = require('../../fixtures/headers/unitOfMeasureGlossaryHeaders.json');

When(/^I check the data table headers are displayed and are correct for units of measure glossary$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(unitsOfMeasureGlossaryTableHeaderCells);
});

