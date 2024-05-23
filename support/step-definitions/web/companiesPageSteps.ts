import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../pageobjects/web/commonPageElements';
import { CompaniesPage } from '../../pageobjects/web/companiesPage';
import { randomCompanyCode } from '../../utilities/randomDataGenerator';
import { Companies } from '../../rest/companies';
import { DeleteOneCompany } from '../../rest/deleteOneCompany';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let companiesPage = new CompaniesPage(chrome);
const companies = new Companies();
const deleteOneCompany = new DeleteOneCompany();

const requiredErrorMessages = require('../../fixtures/requiredFieldErrorMessages/newCompanyModal.json');

When(/^I click add new company button$/, async () => {
    const addNewCompanyButton = await companiesPage.addNewCompanyButton;
    await commonPageElements.clickElement(addNewCompanyButton);
});

When(/^I click edit company (.*) button$/, async (buttonType) => {
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
    const editCompanyButton = await companiesPage.getEditButton(buttonIndex);
    await commonPageElements.clickElement(editCompanyButton);
});


Then(/^I check the company required error labels are displayed for (.*)$/, async (section: string) => {
    let requiredErrorMessagesForSection;

    switch (section) {
        case 'company details':
            requiredErrorMessagesForSection = requiredErrorMessages.companyDetails;
            break;
        case 'company contact information':
            requiredErrorMessagesForSection = requiredErrorMessages.companyContactInformation;
            break;
        case 'company display preferences':
            requiredErrorMessagesForSection = requiredErrorMessages.companyDisplaysReferences;
            break;
        default:
            throw new Error(`Unsupported section: ${section}`);
    }
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessagesForSection);
});

When(/^I remove all test companies$/, async () => {
    const companyIds = await companies.getCompaniesList();

    if (companyIds.length === 0) {
        console.log("No companies found to delete.");
    } else {
        // Iterate over each company ID and delete the company
        for (const companyId of companyIds) {
            await deleteOneCompany.deleteCompany(companyId);
            console.log(`Deleted company with ID: ${companyId}`);
        }
    }
});
Then(/^I verify the new company modal is closed$/, async () => {
    const newCompanyModal = await commonPageElements.modalContainer;
    await newCompanyModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I fill in the new company details info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const companyName = data.companyName;

    if (code !== undefined) {
        const companyCodeToFill = code === "automationCompanyCode" ? randomCompanyCode : code;
        await commonPageElements.fillInField(await companiesPage.companyCodeField, companyCodeToFill);
    }
    if (companyName !== undefined) {
        await commonPageElements.fillInField(await companiesPage.companyNameField, companyName);
    }
});

When(/^I fill in the new company contact info$/, async function (dataTable: DataTable) {
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
        await commonPageElements.fillInField(await companiesPage.companyEmailField, email);
    }
    if (phone !== undefined) {
        await commonPageElements.fillInField(await companiesPage.companyPhoneField, phone);
    }
    if (street1 !== undefined) {
        await commonPageElements.fillInField(await companiesPage.companyStreet1Field, street1);
    }
    if (street2 !== undefined) {
        await commonPageElements.fillInField(await companiesPage.companyStreet2Field, street2);
    }
    if (country !== undefined) {
        await commonPageElements.selectTypeaheadOption(await companiesPage.companyCountryDropdown, country);
    }
    if (city !== undefined) {
        await commonPageElements.fillInField(await companiesPage.companyCityField, city);
    }
    if (state !== undefined && country === "United States") {
        // Select state from dropdown if the country is United States
        await commonPageElements.selectTypeaheadOption(await companiesPage.companyStateDropdown, state);
    } 
    if (state !== undefined && country !== "United States") {
        // Fill in state field directly if the country is not United States
        await commonPageElements.fillInField(await companiesPage.companyStateField, state);
    }
    if (zip !== undefined) {
        await commonPageElements.fillInField(await companiesPage.companyZipField, zip);
    }
});

When(/^I fill in the new company display preferences info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const currency = data.currency;
    const language = data.language;
    const dateFormat = data.dateFormat;
    const timeFormat = data.timeFormat;
    const timezone = data.timezone;
    const measurementSystem = data.measurementSystem;

    if (currency !== undefined) {
        await commonPageElements.selectDropdownOption(await companiesPage.companyCurrencyDropdown, currency);
    }
    if (language !== undefined) {
        await commonPageElements.selectDropdownOption(await companiesPage.companyLanguageDropdown, language);
    }
    if (dateFormat !== undefined) {
        await commonPageElements.selectDropdownOption(await companiesPage.companyDateFormatDropdown, dateFormat);
    }
    if (timeFormat !== undefined) {
        if (timeFormat === "AM / PM") {
            await commonPageElements.selectDropdownOption(await companiesPage.companyTimeFormatDropdown, "6:09 AM | 6:09 PM");
        } else if (timeFormat === "00:00") {
            await commonPageElements.selectDropdownOption(await companiesPage.companyTimeFormatDropdown, "06:09 | 18:09");
        } else if (timeFormat === "0:00") {
            await commonPageElements.selectDropdownOption(await companiesPage.companyTimeFormatDropdown, "6:09 | 18:09");
        } else {
            await commonPageElements.selectDropdownOption(await companiesPage.companyTimeFormatDropdown, timeFormat);
        }

    }
    if (timezone !== undefined) {
        await commonPageElements.selectDropdownOption(await companiesPage.companyTimeZoneDropdown, timezone);
    }
    if (measurementSystem !== undefined) {
        await commonPageElements.selectDropdownOption(await companiesPage.companyMeasurementSystemField, measurementSystem);
    }
});


Then(/^I check the saved company info is displayed correctly$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const expectedFields = [
        { field: 'companyName', labelIndex: 0 },
        { field: 'code', labelIndex: 1 }
    ];

    const labels = await companiesPage.labels;

    for (const { field, labelIndex } of expectedFields) {
        const expectedValue = data[field];
        if (expectedValue !== undefined) {
            const label = await labels[labelIndex].getText();
            if (expectedValue === "automationCompanyCode") {
                expect(label).toEqual(randomCompanyCode.toUpperCase());
            } else {
                expect(label).toEqual(expectedValue);
            }

        }
    }
});

Then(/^I check the saved company contact information is displayed correctly$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const expectedFields = [
        { field: 'email', labelIndex: 2 },
        { field: 'phone', labelIndex: 3 },
        { field: 'street1', labelIndex: 4 },
        { field: 'street2', labelIndex: 5 },
        { field: 'country', labelIndex: 6 },
        { field: 'state', labelIndex: 7 },
        { field: 'city', labelIndex: 8 },
        { field: 'zip', labelIndex: 9 }
    ];

    const labels = await companiesPage.labels;

    for (const { field, labelIndex } of expectedFields) {
        const expectedValue = data[field];
        if (expectedValue !== undefined) {
            const label = await labels[labelIndex].getText();
            expect(label).toEqual(expectedValue);
        }
    }
});


Then(/^I check the saved company display preferences is displayed correctly$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const expectedFields = [
        { field: 'currency', labelIndex: 10 },
        { field: 'language', labelIndex: 11 },
        { field: 'dateTime', labelIndex: 12 },
        { field: 'timezone', labelIndex: 13 }
    ];

    const labels = await companiesPage.labels;

    for (const { field, labelIndex } of expectedFields) {
        const expectedValue = data[field];
        if (expectedValue !== undefined) {
            const label = await labels[labelIndex].getText();
            expect(label).toEqual(expectedValue);
        }
    }
});

