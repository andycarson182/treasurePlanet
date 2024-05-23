import { DataTable, When, Then } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { TeamsPage } from '../../pageobjects/web/teamsPage';
import { randomTeamName } from '../../utilities/randomDataGenerator';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let teamsPage = new TeamsPage(chrome);

const teamsTableHeaderCells = require('../../fixtures/headers/teamsHeader.json');
const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newTeamModal.json');

When(/^I check the data table headers are displayed and are correct for teams$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(teamsTableHeaderCells);
});

When(/^I select "(.*)" action option in teams$/, async (actionOption: string) => {
    await teamsPage.selectActioninMenuOption(actionOption);
});


When(/^I fill in the "(add new team|edit team info)" modal$/, async function (_, dataTable: DataTable) { //_ to indicate that the variable is intentionally unused:
    const data = dataTable.hashes()[0];
    const teamName = data.teamName;
    const teamStatus = data.teamStatus;
    const teamDescription = data.teamDescription;

    await teamsPage.fillInTeamName(teamName);
    await teamsPage.selectStatus(teamStatus);
    await teamsPage.fillInTeamDescription(teamDescription);
});

Then(/^I check the saved team info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const row: string = data.row
    const teamName = data.teamName;
    const teamDescription = data.teamDescription;
    const teamStatus = data.teamStatus;
    const numberOfMembers = data.numberOfMembers;
    const taskFilters = data.taskFilters;

    await chrome.pause(5000); //UI delay
    if (teamName !== undefined) {
        const TeamNameToFill = teamName === "automationTeamName" ? randomTeamName : teamName;
        await teamsPage.checkExpectedLabelCellIs(row, "name", TeamNameToFill);
    }
    if (teamDescription !== undefined) {
        await teamsPage.checkExpectedLabelCellIs(row, "description", teamDescription);
    }
    if (teamStatus !== undefined) {
        await teamsPage.checkExpectedLabelCellIs(row, "status", teamStatus);
    }
    if (numberOfMembers !== undefined) {
        await teamsPage.checkExpectedLabelCellIs(row, "userCount", numberOfMembers);
    }
    if (taskFilters !== undefined) {
        await teamsPage.checkExpectedLabelCellIs(row, "taskFilterArray", taskFilters);
    }
});

When(/^I filter by "(.*)" on (teams term filter|manage user modal filter)$/, async (term: string, filterType: string) => {
    let filterInput;
    switch (filterType) {
        case "teams term filter":
            filterInput = await teamsPage.filterOnTermInput;
            break;
        case "manage user modal filter":
            filterInput = await teamsPage.filterOnTermInputForManageUserModal;
            break;
        default:
            throw new Error("Invalid filter type provided");
    }

    const searchTerm = (term === "automationTeamName") ? randomTeamName : term;
    await commonPageElements.fillFilterOnTerm(filterInput, searchTerm);
    await chrome.pause(4000); //UI delay
});

Then(/^I check the required error labels are displayed$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new team modal is closed$/, async () => {
    const newTeamModal = await commonPageElements.modalContainer;
    await newTeamModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I select the row in the position (.*) for (teams|assign user) checkbox$/, async (row, cellType) => {
    await teamsPage.selectCheckbox(row, cellType);
});

Then(/^I verify "no results" is displayed on the teams table$/, async () => {
    const noResultsLabel = await teamsPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});

