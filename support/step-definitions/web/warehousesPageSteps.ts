import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { WarehousesPage } from '../../pageobjects/web/warehousesPage';
import { randomWarehouseCode } from '../../utilities/randomDataGenerator';
import { Warehouses } from '../../rest/warehouses';
import { DeleteOneWarehouse } from '../../rest/deleteOneWarehouse';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let warehousesPage = new WarehousesPage(chrome);
const warehouses = new Warehouses();
const deleteOneWarehouse = new DeleteOneWarehouse();

const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newWarehouseModal.json');

When(/^I click add new warehouse button$/, async () => {
    const addNewWarehouseButton = await warehousesPage.addNewWarehouseButton;
    await commonPageElements.clickElement(addNewWarehouseButton);
});

When(/^I click edit warehouse (.*) button$/, async (buttonType) => {
    let buttonIndex;

    switch (buttonType.toLowerCase()) {
        case 'details':
            buttonIndex = 1;
            break;
        case 'contact information':
            buttonIndex = 2;
            break;
        case 'display preferences':
            buttonIndex = 3;
            break;
        default:
            throw new Error(`Invalid button type: ${buttonType}`);
    }
    const editCompanyButton = await warehousesPage.getEditButton(buttonIndex);
    await commonPageElements.clickElement(editCompanyButton);
});


Then(/^I check the warehouse required error labels are displayed for "(.*)"$/, async (section: string) => {
    let requiredErrorMessagesForSection;

    switch (section) {
        case 'warehouse details':
            requiredErrorMessagesForSection = requiredErrorMessages.warehouseDetails;
            break;
        case 'warehouse contact information':
            requiredErrorMessagesForSection = requiredErrorMessages.warehouseContactInformation;
            break;
        case 'warehouse display preferences':
            requiredErrorMessagesForSection = requiredErrorMessages.WarehouseDisplaysReferences;
            break;
        default:
            throw new Error(`Unsupported section: ${section}`);
    }

    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessagesForSection);
});

When(/^I remove all test warehouses$/, async () => {
    const warehouseIds = await warehouses.getWarehousesList();

    if (warehouseIds.length === 0) {
        console.log("No warehouses found to delete.");
    } else {
        // Iterate over each warehouse ID and delete the warehouse
        for (const warehouseId of warehouseIds) {
            await deleteOneWarehouse.deleteWarehouse(warehouseId);
            console.log(`Deleted warehouse with ID: ${warehouseId}`);
        }
    }
});

Then(/^I verify the new warehouse modal is closed$/, async () => {
    const newWarehouseModal = await commonPageElements.modalContainer;
    await newWarehouseModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new warehouse details info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const warehouseLabel = data.warehouseLabel;
    const warehouseCode = data.warehouseCode;
    const companyAssociation = data.companyAssociation;
    const warehouseModel = data.warehouseModel;

    if (warehouseLabel !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehouseLabelField, warehouseLabel);
    }
    if (warehouseCode !== undefined) {
        const warehouseCodeToFill = warehouseCode === "automationWarehouseCode" ? randomWarehouseCode : warehouseCode;
        await commonPageElements.fillInField(await warehousesPage.warehouseCodeField, warehouseCodeToFill);
    }
    if (companyAssociation !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseCompanyAssociationDropdown, companyAssociation);
    }
    if (warehouseModel !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseModelDropdown, warehouseModel);
    }
});

When(/^I fill in the new warehouse contact info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const email = data.email;
    const phone = data.phone;
    const street1 = data.street1;
    const street2 = data.street2;
    const country = data.country;
    const city = data.city;
    const state = data.state;
    const zip = data.zip;

    if (email !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehouseEmailField, email);
    }
    if (phone !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehousePhoneField, phone);
    }
    if (street1 !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehouseStreet1Field, street1);
    }
    if (street2 !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehouseStreet2Field, street2);
    }
    if (country !== undefined) {
        await commonPageElements.selectTypeaheadOption(await warehousesPage.warehouseCountryDropdown, country);
    }
    if (city !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehouseCityField, city);
    }
    if (state !== undefined && country === "United States") {
        // Select state from dropdown if the country is United States
        await commonPageElements.selectTypeaheadOption(await warehousesPage.warehouseStateDropdown, state);
    }
    if (state !== undefined && country !== "United States") {
        // Fill in state field directly if the country is not United States
        await commonPageElements.fillInField(await warehousesPage.warehouseStateField, state);
    }
    if (zip !== undefined) {
        await commonPageElements.fillInField(await warehousesPage.warehouseZipField, zip);
    }
});

When(/^I fill in the new warehouse display preferences info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const currency = data.currency;
    const language = data.language;
    const dateFormat = data.dateFormat;
    const timeFormat = data.timeFormat;
    const timezone = data.timezone;
    const measurementSystem = data.measurementSystem;

    if (currency !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseCurrencyDropdown, currency);
    }
    if (language !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseLanguageDropdown, language);
    }
    if (dateFormat !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseDateFormatDropdown, dateFormat);
    }
    if (timeFormat !== undefined) {
        if (timeFormat === "AM / PM") {
            await commonPageElements.selectDropdownOption(await warehousesPage.warehouseTimeFormatDropdown, "6:09 AM | 6:09 PM");
        } else if (timeFormat === "00:00") {
            await commonPageElements.selectDropdownOption(await warehousesPage.warehouseTimeFormatDropdown, "06:09 | 18:09");
        } else if (timeFormat === "0:00") {
            await commonPageElements.selectDropdownOption(await warehousesPage.warehouseTimeFormatDropdown, "6:09 | 18:09");
        } else {
            await commonPageElements.selectDropdownOption(await warehousesPage.warehouseTimeFormatDropdown, timeFormat);
        }

    }
    if (timezone !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseTimeZoneDropdown, timezone);
    }
    if (measurementSystem !== undefined) {
        await commonPageElements.selectDropdownOption(await warehousesPage.warehouseMeasurementSystemField, measurementSystem);
    }
});


Then(/^I check the saved warehouse detail info is displayed correctly$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const expectedFields = [
        { field: 'warehouseLabel', labelIndex: 0 },
        { field: 'companyAssiciation, ', labelIndex: 1 },
        //Andres P - Need to add warehouse ERP with no value validation
        { field: 'warehouseCode', labelIndex: 3 },
        { field: 'warehouseModel', labelIndex: 4 }
    ];

    const labels = await warehousesPage.labels;

    for (const { field, labelIndex } of expectedFields) {
        const expectedValue = data[field];
        if (expectedValue !== undefined) {
            const label = await labels[labelIndex].getText();
            if (expectedValue === "automationWarehouseCode") {
                expect(label).toEqual(randomWarehouseCode.toUpperCase());
            } else {
                expect(label).toEqual(expectedValue);
            }

        }
    }
});

Then(/^I check the saved warehouse contact information is displayed correctly$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const expectedFields = [
        { field: 'email', labelIndex: 5 },
        { field: 'phone', labelIndex: 6 },
        { field: 'street1', labelIndex: 7 },
        { field: 'street2', labelIndex: 8 },
        { field: 'country', labelIndex: 9 },
        { field: 'state', labelIndex: 10 },
        { field: 'city', labelIndex: 11 },
        { field: 'zip', labelIndex: 12 }
    ];

    const labels = await warehousesPage.labels;

    for (const { field, labelIndex } of expectedFields) {
        const expectedValue = data[field];
        if (expectedValue !== undefined) {
            const label = await labels[labelIndex].getText();
            expect(label).toEqual(expectedValue);
        }
    }
});


Then(/^I check the saved warehouse display preferences is displayed correctly$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const expectedFields = [
        { field: 'currency', labelIndex: 13 },
        { field: 'language', labelIndex: 14 },
        { field: 'dateTime', labelIndex: 15 },
        { field: 'timezone', labelIndex: 16 },
        { field: 'measurementSystem', labelIndex: 17 }
    ];

    const labels = await warehousesPage.labels;

    for (const { field, labelIndex } of expectedFields) {
        const expectedValue = data[field];
        if (expectedValue !== undefined) {
            const label = await labels[labelIndex].getText();
            expect(label).toEqual(expectedValue);
        }
    }
});
