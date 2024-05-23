import { When } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { InventoryPage } from '../../pageobjects/web/inventoryPage';
import { Ingestion } from '../../rest/ingestion';
import { InventoryStock } from '../../rest/inventoryStock';
import { RemoveLpFromInventory } from '../../rest/removeLpFromInvetory';
import { OpenedTasks } from '../../rest/openedTasks';
import { multiremotebrowser } from '@wdio/globals';
import { CancelTasks } from '../../rest/cancelTasks';
import { manualReceivingRandomLicensePlateNumber, randomLicensePlateNumber } from '../../utilities/randomDataGenerator';

const inventoryTableHeaderCells = require('../../fixtures/headers/inventoryHeader.json');
const inventoryCountinTableHeaderCells = require('../../fixtures/headers/inventoryCountingHeader.json');
const inventoryCountingActionButtons = require('../../fixtures/headers/inventoryCountingActionButtons.json');
export let licensePlateCode: string;
export let binCode: string;
const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let inventoryPage = new InventoryPage(chrome);
const ingestion = new Ingestion();
const openedTasks = new OpenedTasks();
const cancelTasks = new CancelTasks();
const inventoryStock = new InventoryStock();
const removeLpFromInvetory = new RemoveLpFromInventory();

When(/^I open the inventory section$/, async () => {
    await chrome.pause(5000);
    const inventorySection = await commonPageElements.getSidebarLink('inventory');
    await commonPageElements.clickElement(inventorySection);
});

When(/^I click the bin level dropdown$/, async () => {
    const binLevelDropdownButton = await inventoryPage.binLevelDropdownButton;
    await commonPageElements.clickElement(binLevelDropdownButton);
});

When(/^I click the first checkbox in the inventory table$/, async () => {
    const firstCheckbox = await inventoryPage.firstCheckbox;
    await firstCheckbox.scrollIntoView();
    await firstCheckbox.click();
});

When(/^I select "(.*)" as level menu$/, async (levelOption: string) => {
    await inventoryPage.selectOptionInInventoryLevelMenu(levelOption);
});


When(/^I create stock from production$/, async () => {
    await ingestion.licensePlateCreation(randomLicensePlateNumber);
    console.log(`This is your LP created: ${randomLicensePlateNumber}`);
    await chrome.pause(60000);//Handling Delay in the Ingestion Process
});

When(/^I remove all license plates stock from inventory$/, async () => {
    try {
        const licensePlateIds = await inventoryStock.getInventoryStock();
        if (licensePlateIds.length > 0) {
            for (const lpId of licensePlateIds) {
                await removeLpFromInvetory.removeLpsStockFromInventory(lpId)
            }
        } else {
            console.log("There are no LP to remove on the bin inventory");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

When(/^I cleaned open tasks$/, async () => {
    try {
        const taskIds = await openedTasks.getOpenedTask();
        const formattedTaskIds = taskIds.map(id => ({ "id": id }));
        //In case you wanted to see the formatted opened task ids
        // console.log("Formatted Task IDs:", formattedTaskIds);
        if (formattedTaskIds.length > 0) {
            await cancelTasks.updatingTaskStatusToCancel(formattedTaskIds);
        } else {
            console.log("There are no opened tasks");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

When(/^I changed the opened tasks for ingested LP to canceled$/, async () => {
    let attempt = 0;
    const taskIds = await openedTasks.getOpenedTaskForLP(randomLicensePlateNumber);
    let formattedTaskIds = taskIds.map(id => ({ "id": id }));

    while (attempt < 30 && formattedTaskIds.length === 0) {
        try {
            await chrome.pause(1500);
            const taskIds = await openedTasks.getOpenedTaskForLP(randomLicensePlateNumber);
            formattedTaskIds = taskIds.map(id => ({ "id": id }));
            console.log('Task Ids:', formattedTaskIds);
        } catch (error) {
            console.error("Error:", error);
        }
        attempt++;
    }
    // Check if the formatted task IDs array is still empty
    if (formattedTaskIds.length === 0) {
        console.error("No task IDs found for ingested LP.");
        return; // Exit the function if no task IDs are found
    }
    try {
        await cancelTasks.updatingTaskStatusToCancel(formattedTaskIds);
    } catch (error) {
        console.error("Error:", error);
    }
});

When(/^I filter by License Plate "(.*)"$/, async (licensePlateNumber: string) => {
    if (licensePlateNumber === "randomLicensePlateNumber") {
        await commonPageElements.fillFilterOnTerm(await inventoryPage.licensePlateFilterInput, randomLicensePlateNumber)
    } else if (licensePlateNumber === "manualReceivingRandomLicensePlateNumber") {
        await commonPageElements.fillFilterOnTerm(await inventoryPage.licensePlateFilterInput, manualReceivingRandomLicensePlateNumber)
    }
    else {
        await commonPageElements.fillFilterOnTerm(await inventoryPage.licensePlateFilterInput, licensePlateNumber)
    }
});

When(/^I filter by "(.*)" on the bin number input filter$/, async (filterWord: string) => {
    await commonPageElements.fillFilterOnTerm(await inventoryPage.filterOnNumberInput, filterWord)
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

When(/^I click the license plate actions button$/, async () => {
    const licensePlateActionsButton = await inventoryPage.licensePlateActionsButton;
    await licensePlateActionsButton.click();
});

When(/^I select "(.*)" as destination bin in the move license plante b2b modal$/, async (destinationBin: string) => {
    const destinationBinDropdown = await inventoryPage.destinationBinDropdown
    await commonPageElements.selectTypeaheadOption(destinationBinDropdown, destinationBin)
});

When(/^I click the "mark as complete" checkbox in the move license plante b2b modal$/, async () => {
    const markAsCompleteCheckbox = await inventoryPage.markAsCompleteCheckbox;
    await markAsCompleteCheckbox.click();
});

When(/^I click the inventory conting actions button$/, async () => {
    const inventoryCountingActionsButton = await inventoryPage.inventoryCountingActionsButton;
    await inventoryCountingActionsButton.click();
});

When(/^I check the inventory counting actions menu options$/, async () => {
    await browser.pause(5000);
    await inventoryPage.checkInventoryCountingActionButtonOptions(inventoryCountingActionButtons);
});


