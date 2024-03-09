import { When } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { InventoryPage } from '../../pageobjects/web/inventoryPage';
import { Ingestion } from '../../rest/ingestion';
import { multiremotebrowser } from '@wdio/globals';

const inventoryTableHeaderCells = require('../../fixtures/headers/inventoryHeader.json');
const inventoryCountinTableHeaderCells = require('../../fixtures/headers/inventoryCountingHeader.json');
const inventoryCountingActionButtons = require('../../fixtures/headers/inventoryCountingActionButtons.json');

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let inventoryPage = new InventoryPage(chrome);
const ingestion = new Ingestion();
export const randomLicensePlateNumber = `AUTOMATIONLICENSEPLATE${Math.floor(100000 + Math.random() * 900000)}`;

When(/^I open the inventory Section$/, async () => {
    await browser.pause(5000);
    const inventorySectionElement = await commonPageElements.inventorySection;
    await commonPageElements.clickElement(inventorySectionElement);
});

When(/^I click the bin level dropdown$/, async () => {
    const binLevelDropdownButton = await inventoryPage.binLevelDropdownButton;
    await commonPageElements.clickElement(binLevelDropdownButton);
});

When(/^I select "(.*)" as level menu$/, async (levelOption: string) => {
    await inventoryPage.selectOptionInInventoryLevelMenu(levelOption);
});


When(/^I create stock from production$/, async () => {
    await ingestion.licensePlateCreation(randomLicensePlateNumber);
    await chrome.pause(15000);
    console.log(`This is your LP created: ${randomLicensePlateNumber}`);
});

When(/^I filter by License Plate and select the result$/, async () => {
    await inventoryPage.fillLicensePlateFilter(randomLicensePlateNumber);
    await inventoryPage.selectFirstElemenOfTheTable();
});


When(/^I check the data table headers are displayed and are correct for "(.*)"$/, async (inventoryTab: string) => {
    if (inventoryTab === "inventory") {
        await commonPageElements.checkDataTableHeaderCells(inventoryTableHeaderCells);
    } else if (inventoryTab === "inventory counting") {
        await commonPageElements.checkDataTableHeaderCells(inventoryCountinTableHeaderCells);
    } else {
        throw new Error("Not a valid intentory tab section")
    }
});

When(/^I select "(.*)" inventory tab$/, async (inventoryTab: string) => {
    await inventoryPage.selectInventoryTab(inventoryTab);
});

When(/^I click the inventory conting actions button$/, async () => {
    const inventoryCountingActionsButton = await inventoryPage.inventoryCountingActionsButton;
    await inventoryCountingActionsButton.click();
});

When(/^I check the inventory counting actions menu options$/, async () => {
    await browser.pause(5000);
    await inventoryPage.checkInventoryCountingActionButtonOptions(inventoryCountingActionButtons);
});






