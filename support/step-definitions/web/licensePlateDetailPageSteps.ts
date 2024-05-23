import { Then, When } from '@wdio/cucumber-framework';
import { LicensePlateDetailPage } from "../../pageobjects/web/licensePlateDetailPage";
import { multiremotebrowser } from '@wdio/globals'

const chrome = multiremotebrowser.getInstance('chrome');
let licensePlateDetailPage = new LicensePlateDetailPage(chrome);
export let destinationBin: string;
export let taskCode:string;

Then(/^I see the "(.*)" task was created in the row "(.*)" in the license plate tasks table$/, async (taskName: string, row: number) => {
    await licensePlateDetailPage.checkExpectedTaskTypeIs(row, taskName);
});

Then(/^I see the task status is "(.*)" in the row "(.*)" in the license plate tasks table$/, async (taskStatus: string, row: number) => {
    await licensePlateDetailPage.checkExpectedTaskStatusIs(row, taskStatus);
});

When(/^I save the destination bin of the row "(.*)" in the license plate tasks table$/, async (row: number) => {
    destinationBin = await licensePlateDetailPage.getDestinationBin(row);
    console.log('This is your destination bin', destinationBin);
});

When(/^I save the task code of the row "(.*)" in the license plate tasks table$/, async (row: number) => {
    taskCode = await licensePlateDetailPage.getTaskCode(row);
    console.log('This is your task code', taskCode);
});





