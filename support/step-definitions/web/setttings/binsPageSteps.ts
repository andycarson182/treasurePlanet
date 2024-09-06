import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { DatePickerElement } from '../../../pageobjects/web/datePickerElement';
import { BinsPage } from '../../../pageobjects/web/settings/binsPage';
import { randomBinCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneBin } from '../../../rest/deleteEndpoints/deleteOneBin';
import { CreateOneBin } from '../../../rest/createEndpoints/createOneBin';
import { GetBins } from '../../../rest/getEndpoints/getBins';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let datePickerElement = new DatePickerElement(chrome);
let filterElements = new FilterElements(chrome, 'BinSettings');
let binsPage = new BinsPage(chrome);
const deleteOneBin = new DeleteOneBin();
const createOneBin = new CreateOneBin();
const getBins = new GetBins();
export let currentDate: string;

const binsTableHeaderCells = require('../../../fixtures/headers/binsHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newBinModal.json');


When(/^I select "(.*)" action option on bins page$/, async (actionOption: string) => {
    await binsPage.selectActionInMenuOption(actionOption);
});

Then(/^I verify the new bin modal is closed$/, async () => {
    const newBinModal = await commonPageElements.modalContainer;
    await newBinModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I check the data table headers are displayed and are correct for bins$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(binsTableHeaderCells);
});

Then(/^I check the required error labels are displayed for bin creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

When(/^I fill in the new bin info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const binSizeCode = data.binSizeCode;
    const binCode = data.binCode;
    const areaCode = data.areaCode;
    const aisle = data.aisle;
    const column = data.column;
    const level = data.level;
    const x = data.x;
    const y = data.y;
    const lastCountDate = data.lastCountDate;

    if (binSizeCode !== undefined) {
        await binsPage.selectBinSizeCode(binSizeCode);
    }
    if (binCode !== undefined) {
        const binCodeToFill = binCode === "automationBinCode" ? randomBinCode : binCode;
        await commonPageElements.fillInField(await binsPage.binCodeField, binCodeToFill);
    }
    if (areaCode !== undefined) {
        await commonPageElements.selectDropdownOption(await binsPage.binAreaDropdown, areaCode)
    }
    if (aisle !== undefined) {
        await commonPageElements.selectTypeaheadOption(await binsPage.binAisleField, aisle);
    }
    if (column !== undefined) {
        await commonPageElements.selectTypeaheadOption(await binsPage.binColumnField, column);
    }
    if (level !== undefined) {
        await commonPageElements.fillInField(await binsPage.binLevelField, level);
    }
    if (x !== undefined) {
        await commonPageElements.fillInField(await binsPage.binXField, x);
    }
    if (y !== undefined) {
        await commonPageElements.fillInField(await binsPage.binYField, y);
    }
    if (lastCountDate !== undefined) {
        console.log('Andres')
        await datePickerElement.fillDateTimeField(await binsPage.lastCountDateField, lastCountDate);
        console.log('Andres4')
    }
});


Then(/^I verify that the previously saved bin info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const binCode: string = data.binCode;
    const status: string = data.status;
    const removal: string = data.removal;
    const placement: string = data.placement;
    const zone: string = data.zone;
    const areaCode: string = data.areaCode;
    const level: string = data.level;
    const verificationCode: string = data.verificationCode;
    const x: string = data.x;
    const y: string = data.y;
    const lastMovement: string = data.lastMovement;
    const lastCountDate: string = data.lastCountDate;
    const hasOpenTasks: string = data.hasOpenTasks;
    const containsProducts: string = data.containsProducts;
    const binSizeCode: string = data.binSizeCode;
    const weightCapacity = data.weightCapacity;
    const depth = data.depth;
    const width = data.width;
    const height = data.height;
    const tags = data.tags;

    await chrome.pause(5000); //UI delay
    if (binSizeCode !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeCode", binSizeCode);
    }
    if (binCode !== undefined) {
        const binCodeToCheck = binCode === "automationBinCode" ? randomBinCode.toUpperCase() : binCode.toUpperCase();
        await binsPage.checkExpectedLabelCellIs(row, "code", binCodeToCheck);
    }
    if (status !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "inactive", status);
    }
    if (removal !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "sourceBinBlock", removal);
    }
    if (placement !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "destinationBinBlock", placement);
    }
    if (zone !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "zoneCode", zone);
    }
    if (areaCode !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "areaCode", areaCode);
    }
    if (level !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "level", level);
    }
    if (verificationCode !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "verificationCode", verificationCode);
    }
    if (x !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "x", x);
    }
    if (y !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "y", y);
    }
    if (lastMovement !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "lastMovement", lastMovement);
    }
    if (lastCountDate) {
        const isToday = lastCountDate.toLowerCase() === 'today';

        if (isToday) {
            const currentDate = new Date();
            const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
                month: '2-digit',  // Always use 2-digit month
                day: '2-digit',    // Always use 2-digit day
                year: 'numeric',
                // hour: '2-digit',
                // minute: '2-digit',
                // hour12: false // 24-hour format
            });
            // The hour is intentionally hardcoded since there's already logic in place for handling dynamic time when needed
            console.log('PICCORO', `${formattedCurrentDate} 00:00 CDT`);
            await binsPage.checkExpectedLabelCellIs(row, "lastCount", `${formattedCurrentDate} 00:00 CDT`); 
        } else {
            await binsPage.checkExpectedLabelCellIs(row, "lastCount", `${lastCountDate} CDT`);
        }
    }
    if (hasOpenTasks !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "hasOpenTasks", hasOpenTasks);
    }
    if (containsProducts !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "containsProducts", containsProducts);
    }
    if (weightCapacity !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeWeightCapacity", weightCapacity);
    }
    if (depth !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeDepth", depth);
    }
    if (width !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeWidth", width);
    }
    if (height !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "binSizeHeight", height);
    }
    if (tags !== undefined) {
        await binsPage.checkExpectedLabelCellIs(row, "tags", tags);
    }
});

Then(/^I verify that the previously saved bin info is displayed on the edit bin form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'binSizeCode', pageElement: binsPage.binSizeCodeField },
        { key: 'binSizeLabel', pageElement: binsPage.binSizeLabelField },
        { key: 'binSizeDescription', pageElement: binsPage.binSizeDescriptionField },
        { key: 'weightCapacity', pageElement: binsPage.binSizeWeightField },
        { key: 'depth', pageElement: binsPage.binSizeDepthField },
        { key: 'width', pageElement: binsPage.binSizeWidthField },
        { key: 'height', pageElement: binsPage.binSizeHeightField },
        { key: 'binCode', pageElement: binsPage.binCodeField },
        { key: 'area', pageElement: binsPage.binAreaDropdown },
        { key: 'aisle', pageElement: binsPage.binAisleField },
        { key: 'column', pageElement: binsPage.binColumnField },
        { key: 'level', pageElement: binsPage.binLevelField },
        { key: 'xCoordinate', pageElement: binsPage.binXField },
        { key: 'yCoordinate', pageElement: binsPage.binYField },
        { key: 'lastCountDate', pageElement: binsPage.lastCountDateField }
    ];

    for (const field of fieldsToCheck) {
        let expectedValue = data[field.key];

        if (field.key === 'lastCountDate') {
            const isToday = expectedValue.toLowerCase() === 'today';

            if (isToday) {
                const currentDate = new Date();
                const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
                    month: '2-digit',  // Always use 2-digit month
                    day: '2-digit',    // Always use 2-digit day
                    year: 'numeric',
                });
                expectedValue = `${formattedCurrentDate} 00:00`; // Hardcoded time as per your requirement
                console.log('PICCORO2', expectedValue);
            }
        }

        if (expectedValue !== undefined) {
            await browser.waitUntil(async () => {
                const inputValue = await field.pageElement.getValue();
                return inputValue === expectedValue;
            }, {
                timeout: 30000, // Adjust timeout as necessary
                timeoutMsg: `Expected value for ${field.key} to be "${expectedValue}" but it was not found within the timeout period`
            });

            const inputValue = await field.pageElement.getValue();
            expect(inputValue).toEqual(expectedValue);
        }
    }
});



When(/^I filter by column: "(.*)" on the bins section$/, async (option: string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({ timeout: 15000 });
    await commonPageElements.selectTypeaheadOption(filterByColumn, option);
});

When(/^I filter by text "(.*)" on the bins term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {

        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await binsPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationBinCode") {
            isMatch = await filterAndCheck(randomBinCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on bins term filter$/, async (term: string) => {
    await chrome.pause(2000);
    if (term === "automationBinCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomBinCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the bins table$/, async () => {
    const noResultsLabel = await binsPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

When(/^I remove all test bins data$/, async () => {
    const binIds = await getBins.getAutomationBins();

    if (binIds.length === 0) {
        console.log("No bins found to delete.");
    } else {
        // Iterate over each bin ID and delete it
        for (const binId of binIds) {
            await deleteOneBin.deleteBin(binId);
            console.log(`Deleted bin with ID: ${binId}`);
        }
    }
});

When(/^I create a bin thru grahpql endpoin with the bin code: "(.*)"$/, async (binCode: string) => {
    await createOneBin.createAutomationBin(binCode);
});