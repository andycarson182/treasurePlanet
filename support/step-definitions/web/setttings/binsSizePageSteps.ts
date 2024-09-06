import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { BinSizesPage } from '../../../pageobjects/web/settings/binSizesPage';
import { randomBinSizeCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneBinSize } from '../../../rest/deleteEndpoints/deleteOneBinSize';
import { CreateOneBinSize } from '../../../rest/createEndpoints/createOneBinSize';
import { GetBinSizes } from '../../../rest/getEndpoints/getBinSizes';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'BinSizes');
let binSizesPage = new BinSizesPage(chrome);
const deleteOneBinSize = new DeleteOneBinSize();
const createOneBinSize = new CreateOneBinSize();
const getBinSizes = new GetBinSizes();

const binSizesTableHeaderCells = require('../../../fixtures/headers/binSizesHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newBinSizeModal.json');

When(/^I click add new bin size button$/, async () => {
    const addNewBinSizeButton = await binSizesPage.addNewBinSizeButton;
    await commonPageElements.clickElement(addNewBinSizeButton);
});

Then(/^I verify the new bin size modal is closed$/, async () => {
    const newBinSizeModal = await commonPageElements.modalContainer;
    await newBinSizeModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I check the data table headers are displayed and are correct for bin sizes$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(binSizesTableHeaderCells);
});

Then(/^I check the bin size required error labels are displayed for "(.*)"$/, async (section: string) => {
    let requiredErrorMessagesForSection;
    switch (section) {
        case 'dimensions and weights':
            requiredErrorMessagesForSection = requiredErrorMessages.dimensionAndWeights;
            break;
        default:
            throw new Error(`Unsupported section: ${section}`);
    }

    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessagesForSection);
});

When(/^I fill in the new bin size dimensions and weights info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const weightUoM = data.weightUoM;
    const weightCapacity = data.weightCapacity;
    const dimensionUoM = data.dimensionUoM;
    const depth = data.depth;
    const width = data.width;
    const height = data.height;
    const volumeUoM = data.volumeUoM;
    const volume = data.volume;

    if (code !== undefined) {
        const binSizeCodeToFill = code === "automationBinSizeCode" ? randomBinSizeCode : code;
        await commonPageElements.fillInField(await binSizesPage.binSizeCodeField, binSizeCodeToFill);
    }
    if (label !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeLabelField, label)
    }
    if (description !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeDescriptionField, description);
    }
    if (weightUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await binSizesPage.binSizeWeightUoMTypeAHead, weightUoM);
    }
    if (weightCapacity !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeWeightCapacityField, weightCapacity);
    }
    if (dimensionUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await binSizesPage.binSizeDimensionUoMTypeAHead, dimensionUoM);
    }
    if (depth !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeDepthField, depth);
    }
    if (width !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeWidthField, width);
    }
    if (height !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeHeightField, height);
    }
    if (volumeUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await binSizesPage.binSizeVolumeUoMDropdown, volumeUoM);
    }
    if (volume !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.binSizeVolumeField, volume);
    }

});

When(/^I fill in the new bin size product size restrictions info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const productSizeRestriction = data.productSizeRestriction;
    const productLengthLimit = data.productLengthLimit;
    const productWidthLimit = data.productWidthLimit;
    const productHeightLimit = data.productHeightLimit;
    const productLimitUoM = data.productLimitUoM;

    if (productSizeRestriction !== undefined) {
        let radioButton;
        switch (productSizeRestriction) {
            case "Set Product Size Restrictions":
                radioButton = await binSizesPage.setProductSizeRestrictionRadioButton;
                break;
            case "No Product Size Restrictions":
                radioButton = await binSizesPage.noProductSizeRestrictionRadioButton;
                break;
            default:
                throw new Error(`Invalid option: "${productSizeRestriction}". Available options are "Set Product Size Restrictions" or "No Product Size Restrictions".`);
        }
        await radioButton.click();
    }
    if (productLengthLimit !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.productLengthLimitField, productLengthLimit)
    }
    if (productWidthLimit !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.productWidthLimitField, productWidthLimit)
    }
    if (productHeightLimit !== undefined) {
        await commonPageElements.fillInField(await binSizesPage.productHeightLimitField, productHeightLimit);
    }
    if (productLimitUoM !== undefined) {
        await commonPageElements.selectTypeaheadOption(await binSizesPage.productLimitUoMTypeAHead, productLimitUoM)
    }
});

Then(/^I verify that the previously saved bin size info is displayed on the edit bin size form for demensions and weights$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'code', pageElement: binSizesPage.binSizeCodeField },
        { key: 'label', pageElement: binSizesPage.binSizeLabelField },
        { key: 'description', pageElement: binSizesPage.binSizeDescriptionField },
        { key: 'weightUoM', pageElement: binSizesPage.binSizeWeightUoMTypeAHead },
        { key: 'weightCapacity', pageElement: binSizesPage.binSizeWeightCapacityField },
        { key: 'dimensionUoM', pageElement: binSizesPage.binSizeDimensionUoMTypeAHead },
        { key: 'depth', pageElement: binSizesPage.binSizeDepthField },
        { key: 'width', pageElement: binSizesPage.binSizeWidthField },
        { key: 'height', pageElement: binSizesPage.binSizeHeightField },
        { key: 'volumeUoM', pageElement: binSizesPage.binSizeVolumeUoMDropdown },
        { key: 'volume', pageElement: binSizesPage.binSizeVolumeField },
    ];

    for (const field of fieldsToCheck) {
        let expectedValue = data[field.key];
        if (field.key === 'code' && expectedValue === "automationBinSizeCode") {
            expectedValue = randomBinSizeCode.toUpperCase();
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

Then(/^I verify that the previously saved bin size info is displayed on the edit bin size form for product size restrictions$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'productLengthLimit', pageElement: binSizesPage.productLengthLimitField },
        { key: 'productWidthLimit', pageElement: binSizesPage.productWidthLimitField },
        { key: 'productHeightLimit', pageElement: binSizesPage.productHeightLimitField },
        { key: 'productLimitUoM', pageElement: binSizesPage.productLimitUoMTypeAHead},
    ];

    for (const field of fieldsToCheck) {
        let expectedValue = data[field.key];
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

        // Additional verification for radio buttons
        if (data.productSizeRestriction !== undefined) {
            let radioButton;
            
            if (data.productSizeRestriction === "Set Product Size Restrictions") {
                radioButton = await binSizesPage.setProductSizeRestrictionRadioButton;
            } else if (data.productSizeRestriction === "No Product Size Restrictions") {
                radioButton = await binSizesPage.noProductSizeRestrictionRadioButton;
            } else {
                throw new Error(`No valid option provided. The available options are "Set Product Size Restrictions" or "No Product Size Restrictions".`);
            }
            
            const isSelected = await radioButton.isSelected();
            expect(isSelected).toBe(true);
        }
});

Then(/^I verify that the previously saved bin size info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const code = data.code;
    const label = data.label;
    const description = data.description;
    const weightUoM = data.weightUoM;
    const weightCapacity = data.weightCapacity;
    const dimensionUoM = data.dimensionUoM;
    const depth = data.depth;
    const width = data.width;
    const height = data.height;
    const volumeUoM = data.volumeUoM;
    const productLengthLimit = data.productLengthLimit;
    const productWidthLimit = data.productWidthLimit;
    const productHeightLimit = data.productHeightLimit;
    const maximumProductUoM = data.maximumProductUoM;
    const createdBy = data.createdBy;


    await chrome.pause(5000); //UI delay
    if (code !== undefined) {
        const binSizeCodeToCheck = code === "automationBinSizeCode" ? randomBinSizeCode.toUpperCase() : code.toUpperCase();
        await binSizesPage.checkExpectedLabelCellIs(row, "code", binSizeCodeToCheck);
    }
    if (label !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "label", label);
    }
    if (description !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "description", description);
    }
    if (weightUoM !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "weightCapacityUomCode", weightUoM);
    }
    if (weightCapacity !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "weightCapacity", weightCapacity);
    }
    if (dimensionUoM !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "distanceUomCode", dimensionUoM);
    }
    if (depth !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "depth", depth);
    }
    if (width !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "width", width);
    }
    if (height !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "height", height);
    }
    if (volumeUoM !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "volume", volumeUoM);
    }
    if (productLengthLimit !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "productLengthLimit", productLengthLimit);
    }
    if (productWidthLimit !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "productWidthLimit", productWidthLimit);
    }
    if (productHeightLimit !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "productHeightLimit", productHeightLimit);
    }
    if (maximumProductUoM !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "productLimitUomCode", maximumProductUoM);
    }
    if (createdBy !== undefined) {
        await binSizesPage.checkExpectedLabelCellIs(row, "createdByUserFirstName", createdBy);
    }
});

When(/^I filter by column: "(.*)" on the bin sizes section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the bin sizes term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await binSizesPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationBinSizeCode") {
            isMatch = await filterAndCheck(randomBinSizeCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on bin sizes term filter$/, async (term: string) => {
    if (term === "automationBinSizeCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomBinSizeCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the bin sizes table$/, async () => {
    const noResultsLabel = await binSizesPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});


When(/^I remove all test bin sizes data$/, async () => {
    const binSizeIds = await getBinSizes.getAutomationBinSizes();

    if (binSizeIds.length === 0) {
        console.log("No bin sizes found to delete.");
    } else {
        // Iterate over each bin size ID and delete it
        for (const binSizeId of binSizeIds) {
            await deleteOneBinSize.deleteBinSize(binSizeId);
            console.log(`Deleted bin size with ID: ${binSizeId}`);
        }
    }
});

When(/^I create a bin size thru grahpql endpoint$/, async () => {
    await createOneBinSize.createAutomationBinSize();
});



