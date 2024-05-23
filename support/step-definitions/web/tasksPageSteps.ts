import { When, Then } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { TasksPage } from '../../pageobjects/web/tasksPage';
import { multiremotebrowser } from '@wdio/globals';
import { manualReceivingRandomLicensePlateNumber } from '../../utilities/randomDataGenerator';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let tasksPage = new TasksPage(chrome);

When(/^I open the tasks section$/, async () => {
    await browser.pause(5000);
    const tasksSection = await commonPageElements.getSidebarLink('tasks');
    await commonPageElements.clickElement(tasksSection);
});

When(/^I filter by "(.*)" on tasks term filter$/, async (term: string) => {
    if (term === "createdRandomLicensePlateNumber") {
        await commonPageElements.fillFilterOnTerm(await tasksPage.filterOnTermField, manualReceivingRandomLicensePlateNumber);
    } else {
        await commonPageElements.fillFilterOnTerm(await tasksPage.filterOnTermField, term);
    }
});

When(/^I select the first result in the task filter$/, async () => {
    await commonPageElements.selectFirstElemenOfTheTable();
});

Then(/^I see the "(.*)" task was created in the row "(.*)" in the task list table$/, async (taskName: string, row: number) => {
    await tasksPage.checkExpectedTaskTypeIs(row, taskName);
});

Then(/^I see the task status is "(.*)" in the row "(.*)" in the task list table$/, async (taskStatus: string, row: number) => {
    await tasksPage.checkExpectedTaskStatusIs(row, taskStatus);
});



