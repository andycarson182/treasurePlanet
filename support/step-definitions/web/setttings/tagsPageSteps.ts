import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { TagsPage } from '../../../pageobjects/web/settings/tagsPage';
import { DeleteOneTag } from '../../../rest/deleteEndpoints/deleteOneTag';
import { CreateOneTag } from '../../../rest/createEndpoints/createOneTag';
import { GetTags } from '../../../rest/getEndpoints/getTags';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'TagsSettings');
let tagsPage = new TagsPage(chrome);
const deleteOneTag = new DeleteOneTag();
const createOneTag = new CreateOneTag();
const getTags = new GetTags();

const tagsTableHeaderCells = require('../../../fixtures/headers/tagsHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newTagModal.json');

When(/^I click create new tag button$/, async () => {
    const createNewTagButton = await tagsPage.createNewTagButton;
    await commonPageElements.clickElement(createNewTagButton);
});

When(/^I check the data table headers are displayed and are correct for tags$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(tagsTableHeaderCells);
});

When(/^I select "(.*)" action option in tags$/, async (actionOption: string) => {
    await tagsPage.selectActioninMenuOption(actionOption);
});

Then(/^I verify the new tag modal is closed$/, async () => {
    const newTagModal = await commonPageElements.modalContainer;
    await newTagModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

Then(/^I check the required error labels are displayed for tag creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

When(/^I fill in the new tag info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldActions = {
        tagName: async () => {
            await commonPageElements.fillInField(await tagsPage.tagNameField, data.tagName);
        },
        tagDescription: async () => {
            await commonPageElements.fillInField(await tagsPage.tagDescriptionField, data.tagDescription);
        }
    };

    for (const [key, action] of Object.entries(fieldActions)) {
        if (data[key] !== undefined) {
            await action();
        }
    }
});

Then(/^I verify that the previously saved tag info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;
    const tagName = data.tagName;
    const tagDescription = data.tagDescription;

    await chrome.pause(5000); //UI delay
    if (tagName !== undefined) {
        await tagsPage.checkExpectedLabelCellIs(row, "name", tagName);
    }
    if (tagDescription !== undefined) {
        await tagsPage.checkExpectedLabelCellIs(row, "description", tagDescription);
    }
});

Then(/^I verify that the previously saved tag info is displayed on the edit tag form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'tagName', pageElement: tagsPage.tagNameField },
        { key: 'tagDescription', pageElement: tagsPage.tagDescriptionField},

    ];
    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (value !== undefined) {
            const inputValue = await field.pageElement.getValue();
            expect(inputValue).toEqual(value);
        }
    }
});

When(/^I filter by column: "(.*)" on the tags section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the tags term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
    
        return chrome.waitUntil(async () => {
            try {
                await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
                await tagsPage.checkExpectedLabelCellIs("1", "name", expectedValue);
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

When(/^I filter by text "(.*)" on tags term filter$/, async (term: string) => {
    await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
});

When(/^I remove all test tags data$/, async () => {
    const tagIds = await getTags.getAutomationTags();

    if (tagIds.length === 0) {
        console.log("No tags found to delete.");
    } else {
        // Iterate over each tag ID and delete it
        for (const tagId of tagIds) {
            await deleteOneTag.deleteTag(tagId);
            console.log(`Deleted tag with ID: ${tagId}`);
        }
    }
});

When(/^I create a tag thru grahpql endpoint$/, async () => {
    await createOneTag.createAutomationTag();
});