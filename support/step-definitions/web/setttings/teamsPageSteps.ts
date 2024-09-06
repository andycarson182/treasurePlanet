import { DataTable, When, Then } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals'
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { TeamsPage } from '../../../pageobjects/web/settings/teamsPage';
import { randomTeamName } from '../../../utilities/randomDataGenerator';
import { CreateTeam } from '../../../rest/createEndpoints/createOneTeam';
import { AssingUserToTeam } from '../../../rest/assignUserToTeam';
import { DeleteOneTeam } from '../../../rest/deleteEndpoints/deleteOneTeam';
import { GetTeams } from '../../../rest/getEndpoints/getTeams';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'TeamSettings');
let teamsPage = new TeamsPage(chrome);
let createTeam = new CreateTeam();
let deleteOneTeam = new DeleteOneTeam();
let assignUserToTeam = new AssingUserToTeam();
let getTeams = new GetTeams();

const teamsTableHeaderCells = require('../../../fixtures/headers/teamsHeader.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newTeamModal.json');

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

Then(/^I verify that the previously saved team info is displayed on the table as follows$/, async function (dataTable: DataTable) {
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

When(/^I filter by column: "(.*)" on the teams section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:20000});
    await chrome.pause(5000); //UI delay
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on (teams term filter|manage user modal filter)$/, async (term: string, filterType: string) => {
    let filterInput;
    const searchTerm = (term === "automationTeamName") ? randomTeamName : term;
    switch (filterType) {
        case "teams term filter":
            filterInput = await filterElements.filterOnTextInput;
            await commonPageElements.fillFilterOnTerm(filterInput, searchTerm);
            break;
        case "manage user modal filter":
            filterInput = await teamsPage.filterOnTermInputForManageUserModal;
            await filterInput.waitForClickable({ timeout: 30000 }); // Ensure the element is clickable
            await filterInput.scrollIntoView(); // Scroll the element into view if necessary
            await commonPageElements.clearValue(filterInput);
            await filterInput.setValue(searchTerm);
            await filterInput.click();
            await chrome.keys("\uE007");
            await chrome.keys("\uE007"); // Second Enter for UI responsiveness
            break;
        default:
            throw new Error("Invalid filter type provided");
    }

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

When(/^I create a team thru grahpql endpoint$/, async () => {
    await createTeam.createAutomationTeam();
});

When(/^I assign user to a team thru graphql endpoint$/, async () => {
    const teamIds = await getTeams.getAutomationTeams();

    if (teamIds.length === 0) {
        console.log("No teams found.");
    } else {
        // Iterate over each team ID and assign user to the team
        for (const teamId of teamIds) {
            await assignUserToTeam.assignUser(teamId);
            console.log(`assigned team ID: ${teamId}`);
        }
    }
});

When(/^I remove all test teams$/, async () => {
    const teamIds = await getTeams.getAutomationTeams();

    if (teamIds.length === 0) {
        console.log("No teams found to delete.");
    } else {
        // Iterate over each team ID and delete the team
        for (const teamId of teamIds) {
            await deleteOneTeam.deleteTeam(teamId);
            console.log(`Deleted teams with ID: ${teamId}`);
        }
    }
});
