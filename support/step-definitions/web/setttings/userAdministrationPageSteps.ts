import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { UserAdministrationPage } from '../../../pageobjects/web/settings/userAdministrationPage';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { DeleteOneUser } from '../../../rest/deleteEndpoints/deleteOneUser';
import { CreateOneUser } from '../../../rest/createEndpoints/createOneUser';
import { GetUsers } from '../../../rest/getEndpoints/getUsers';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'UserAdminSettings');
let userAdministrationPage = new UserAdministrationPage(chrome);
const deleteOneUser = new DeleteOneUser();
const getUsers = new GetUsers();
const createOneUser = new CreateOneUser();

const tableHeaderCells = require('../../../fixtures/headers/userAdministrationHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newUserModal.json');


When(/^I click add user button$/, async () => {
    const addUserButton = await userAdministrationPage.addUserButton;
    await commonPageElements.clickElement(addUserButton);
});

When(/^I check the data table headers are displayed and are correct for user administration$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(tableHeaderCells);
});

Then(/^I check the required error labels are displayed for user creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new user modal is closed$/, async () => {
    const newUserModal = await commonPageElements.modalContainer;
    await newUserModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new user info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const phone = data.phone;
    const userAssignmentGroups = data.userAssignmentGroups;
    const userActive = data.userActive;

    if (firstName !== undefined) {
        await commonPageElements.fillInField(await userAdministrationPage.firstNameField, firstName);
    }
    if (lastName !== undefined) {
        await commonPageElements.fillInField(await userAdministrationPage.lastNameField, lastName);
    }
    if (email !== undefined) {
        await commonPageElements.fillInField(await userAdministrationPage.emailField, email);
    }
    if (phone !== undefined) {
        await commonPageElements.fillInField(await userAdministrationPage.phoneField, phone);
    }
    if (userAssignmentGroups !== undefined) {
        await commonPageElements.selectTypeaheadOption(await userAdministrationPage.userAssignmentGroupsDropdown, userAssignmentGroups);
    }
    if (userActive!== undefined) {
        await commonPageElements.clickElement(await userAdministrationPage.userActiveCheckbox);
    }
});

Then(/^I verify that the previously saved user info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row;

    // Mapping of data keys to their corresponding table columns
    const fieldsToCheck = [
        { key: 'firstName', column: 'firstName' },
        { key: 'lastName', column: 'lastName' },
        { key: 'email', column: 'email' },
        { key: 'phone', column: 'phone' },
        { key: 'teams', column: 'userTeam' },
        { key: 'userGroup', column: 'userGroups' },
        { key: 'userStatus', column: 'status' },
    ];

    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        const value = data[field.key];
        if (value !== undefined) {
            await userAdministrationPage.checkExpectedLabelCellIs(row, field.column, value);
        }
    }
});

Then(/^I verify that the previously saved user info is displayed on the edit user form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'firstName', pageElement: userAdministrationPage.firstNameField },
        { key: 'lastName', pageElement: userAdministrationPage.lastNameField },
        { key: 'email', pageElement: userAdministrationPage.emailField },
        { key: 'phone', pageElement: userAdministrationPage.phoneField },
        { key: 'userAssignmentGroups', pageElement: userAdministrationPage.chipLabel },
        {key: 'userActive', pageElement:userAdministrationPage.userActiveCheckbox}
    ];
    await chrome.pause(5000); // UI delay

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (value !== undefined) {
            let inputValue;
            if (field.key === 'userAssignmentGroups') {
                inputValue = await field.pageElement.getText();
            } else {
                inputValue = await field.pageElement.getValue();
            }
            expect(inputValue).toEqual(value);
        }
    }
});

When(/^I filter by column: "(.*)" on the user administration section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the user administration term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
        return chrome.waitUntil(async () => {
            try {
                await userAdministrationPage.checkExpectedLabelCellIs("1", "email", expectedValue);
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

When(/^I filter by "(.*)" on user administration term filter$/, async (term: string) => {
    await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
});

Then(/^I verify "no results" is displayed on the user administration table$/, async () => {
    const noResultsLabel = await userAdministrationPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

Then(/^I verify the user email field is disabled$/, async () => {
    const userEmailField = await userAdministrationPage.emailField;
    const isEnabled = await userEmailField.isEnabled();
    expect(isEnabled).toBe(false);
});


When(/^I remove all test users$/, async () => {
    const userIds = await getUsers.getAutomationUsers();

    if (userIds.length === 0) {
        console.log("No users found to delete.");
    } else {
        // Iterate over each user ID and delete the user
        for (const userId of userIds) {
            await deleteOneUser.deleteUser(userId);
            console.log(`Deleted user with ID: ${userId}`);
        }
    }
});

When(/^I create a user thru grahpql endpoint$/, async () => {
    await createOneUser.createAutomationUser();
});

