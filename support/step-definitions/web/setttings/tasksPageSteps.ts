import { When, Then } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { TasksPage } from '../../../pageobjects/web/wms/tasksPage';
import { multiremotebrowser } from '@wdio/globals';
import { manualReceivingRandomLicensePlateNumber } from '../../../utilities/randomDataGenerator';


const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'TaskList');
let tasksPage = new TasksPage(chrome);

When(/^I open the tasks section$/, async () => {
    await browser.pause(5000);
    const tasksSection = await commonPageElements.getSidebarLink('tasks');
    await commonPageElements.clickElement(tasksSection);
});

When(/^I filter by column: "(.*)" on the tasks section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:20000});
    await chrome.pause(5000); //UI delay
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by value "(.*)" on tasks term filter$/, async (term: string) => {
    if (term === "createdRandomLicensePlateNumber") {
        await commonPageElements.selectCustomDropdownOption(await filterElements.filterOnValueInput, manualReceivingRandomLicensePlateNumber);
    } else {
        await commonPageElements.selectCustomDropdownOption(await filterElements.filterOnValueInput, term);
    }
});

When(/^I select the first result in the task table$/, async () => {
    await commonPageElements.selectFirstElemenOfTheTable();
});

Then(/^I see the "(.*)" task was created in the row "(.*)" in the task list table$/, async (taskName: string, row: number) => {
    await tasksPage.checkExpectedTaskTypeIs(row, taskName);
});

Then(/^I see the task status is "(.*)" in the row "(.*)" in the task list table$/, async (taskStatus: string, row: number) => {
    await tasksPage.checkExpectedTaskStatusIs(row, taskStatus);
});

When(/^I clear the pre assigned data range on tasks page$/, async () => {
    const fromDateRangeInput = await tasksPage.fromDateRangeInput;
    await fromDateRangeInput.click();
    const clearDateRangeButton = await tasksPage.clearDateRangeButton;
    await clearDateRangeButton.click();
});

