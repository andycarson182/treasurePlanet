import { Then, When, DataTable } from '@wdio/cucumber-framework';
import { LicensePlateDetailPage } from "../../../pageobjects/web/wms/licensePlateDetailPage";
import { multiremotebrowser } from '@wdio/globals'
import { SapData } from '../../../rest/sapData';
import { DynamicIngestion } from '../../../rest/dynamicIngestion';
import { GetLicensePlateId } from '../../../rest/getLicensePlateId';
import { RemoveLpFromInventory } from '../../../rest/removeLpFromInvetory';
import { GetTaskId } from '../../../rest/getTaskId';
import { CompleteLicensePlateBinToBinTask } from '../../../rest/completeLicensePlateBinToBinTask';
import { CompletePutawayTask } from '../../../rest/completePutawayTask';

const chrome = multiremotebrowser.getInstance('chrome');
let licensePlateDetailPage = new LicensePlateDetailPage(chrome);
let sapData = new SapData();
let dynamicIngestion = new DynamicIngestion();
let getLicensePlateId = new GetLicensePlateId();
let removeLpFromInvetory = new RemoveLpFromInventory();
let getTaskId = new GetTaskId();
let completeLicensePlateBinToBinTask = new CompleteLicensePlateBinToBinTask();
let completePutawayTask = new CompletePutawayTask();
export let destinationBin: string;
export let taskCode: string;

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

When(/^I remove stock from inventory for the license plate code "(.*)"$/, async (licensePlateCode: string) => {
    const licensePlateId = await getLicensePlateId.getLicensePlateId(licensePlateCode);
    await removeLpFromInvetory.removeLpsStockFromInventory(licensePlateId);
});

When(/^I complete the license plate bin to bin task for the license plate code "(.*)" thru graphql api$/, async (licensePlateCode: string) => {
    const licensePlateId = await getLicensePlateId.getLicensePlateId(licensePlateCode);
     const taskId =   await getTaskId.getTaskId(licensePlateId, "notStarted");
     await completeLicensePlateBinToBinTask.completeLicensePlateBinToBinTask(taskId);

});


When(/^I complete the putaway task for the license plate code "(.*)" thru graphql api$/, async (licensePlateCode: string) => {
    const licensePlateId = await getLicensePlateId.getLicensePlateId(licensePlateCode);
    const taskId =   await getTaskId.getTaskId(licensePlateId, "notStarted");
     await completePutawayTask.completePutawayTask(taskId);

});

When(/^I ingest a LP with the following information$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    // Handle 'PALLETIZER' case for storageBin
    const storageBin = data.storageBin === 'PALLETIZER'
        ? (() => {
            const binOptions = ['PALLETIZER-01', 'PALLETIZER-02'];
            const randomIndex = Math.floor(Math.random() * binOptions.length);
            return binOptions[randomIndex];
        })()
        : data.storageBin;

    await dynamicIngestion.licensePlateCreation(
        storageBin,
        data.material,
        data.totalQuantity,
        data.warehouse,
        data.storageUnit,
        data.baseUoM,
        data.batch
    );
    await chrome.pause(100000); //Wait for LP and Putaway tasks creation
});



When(/^I want to ingest "(.*)" LPs for the storage bin:"(.*)"$/, async (numberOfResults: number, storageBinName: string) => {
    const extractedData = await sapData.getDataFromSAP(storageBinName, numberOfResults);

    function getRandomStorageBin(storageBin: string): string {
        if (storageBin === 'PALLETIZER') {
            const binOptions = ['PALLETIZER-01', 'PALLETIZER-02'];
            const randomIndex = Math.floor(Math.random() * binOptions.length);
            return binOptions[randomIndex];
        }
        return storageBin; // Return the original value if not 'PALLETIZER'
    }

    // Function to generate a random license plate number
    // function generateRandomCode(prefix:string) {
    //     return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    // }

    // Create an array of promises for parallel execution
    const promises = extractedData.map(async (data: any) => {
        const { storageUnit, material, totalQuantity, warehouse, baseUoM, batch } = data;
        // const randomLicensePlateNumber = generateRandomCode("AUTOMATIONLICENSEPLATE");
        const selectedStorageBin = getRandomStorageBin(storageBinName);

        // Print the values
        console.log(`Storage Unit: ${storageUnit}`);
        console.log(`Storage Bin: ${selectedStorageBin}`);
        console.log(`Material: ${material}`);
        console.log(`Total Quantity: ${totalQuantity}`);
        console.log(`Warehouse: ${warehouse}`);
        console.log(`Random License Plate Number: ${storageUnit}`);
        console.log(`Base Unit of Measure: ${baseUoM}`);
        console.log(`Batch: ${batch}`);
        console.log('-------------------------');

        // Call the licensePlateCreation function
        await dynamicIngestion.licensePlateCreation(
            selectedStorageBin,
            material,
            totalQuantity,
            warehouse,
            storageUnit,
            baseUoM,
            batch
        );
    });

    // Execute all promises in parallel
    await Promise.all(promises);
});


