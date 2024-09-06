import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { FilterElements } from '../../../pageobjects/web/filterElements';
import { BusinessPartnersPage } from '../../../pageobjects/web/settings/businessPartnersPage';
import { randomBusinessPartnerCode } from '../../../utilities/randomDataGenerator';
import { DeleteOneBusinessPatner } from '../../../rest/deleteEndpoints/deleteOneBusinessPartner';
import { CreateOneBusinessPartner } from '../../../rest/createEndpoints/createOneBusinessPartner';
import { GetBusinessPartners } from '../../../rest/getEndpoints/getBusinessPartners';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let filterElements= new FilterElements(chrome, 'BusinessPartnerSettings');
let businessPartnersPage = new BusinessPartnersPage(chrome);
const deleteOneBusinessPartner = new DeleteOneBusinessPatner();
const createOneBusinessPartner = new CreateOneBusinessPartner();
const getBusinessPartners = new GetBusinessPartners();

const tableHeaderCells = require('../../../fixtures/headers/businessParnersHeaders.json');
const requiredErrorMessages = require('../../../fixtures/requiredFieldErrorMessages/newBusinessPartnerModal.json');

When(/^I select "(.*)" action option in business partners$/, async (actionOption: string) => {
    await businessPartnersPage.selectActioninMenuOption(actionOption);
});

When(/^I check the data table headers are displayed and are correct for business partners$/, async () => {
    await commonPageElements.checkDataTableHeaderCells(tableHeaderCells);
});

Then(/^I check the required error labels are displayed for business partner creation modal$/, async () => {
    await commonPageElements.checkRequiredErrorMessages(requiredErrorMessages);
});

Then(/^I verify the new business partner modal is closed$/, async () => {
    const newBusinessPartnerModal = await commonPageElements.modalContainer;
    await newBusinessPartnerModal.waitForDisplayed({ reverse: true, timeout: 5000 });
});

When(/^I select the business partner checkbox in the row position "(.*)"$/, async (row) => {
    const cellElement = await businessPartnersPage.getBusinessPartnerTableCell(row, 'selection');
    await cellElement.click();
});

When(/^I fill in the new business partner info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const code = data.code;
    const name = data.name;
    const language = data.language;
    const timezone = data.timezone;
    const validityStart = data.validityStart;
    const validityEnd = data.validityEnd;
    const tags = data.tags;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const street = data.street;
    const country = data.country;
    const city = data.city;
    const state = data.state;
    const postalCode = data.postalCode;
    

    if (code !== undefined) {
        const businessPartnerCodeToFill = code === "automationBusinessPartnerCode" ? randomBusinessPartnerCode : code;
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerCodeField, businessPartnerCodeToFill);
    }
    if (name !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerNameField, name)
    }
    if (language !== undefined) {
        await commonPageElements.selectDropdownOption(await businessPartnersPage.businessPartnerLanguageDropdown, language);
    }
    if (timezone !== undefined) {
        await commonPageElements.selectDropdownOption(await businessPartnersPage.businessPartnerTimezoneDropdown, timezone);
    }
    if (validityStart !== undefined) {
        let validityStartDateField = await businessPartnersPage.businessPartnerValidityStarDatePickerDate;
        //This field required a custom actions to enable interaction with it.
        await validityStartDateField.click(); // Click on the field to focus it
        if (process.platform === 'darwin') {
            // Use Meta + A to select all on macOS
            await chrome.keys(['Meta', 'a']);
        } else {
            // Use Control + A to select all on other operating systems (e.g., Ubuntu)
            await chrome.keys(['Control', 'a']);
        }
        await browser.keys('ArrowLeft'); // move the cursor to the beginning of the field
        let formattedDate = validityStart.replace(/\s/g, ''); // Remove spaces from the lastCountDate
        await validityStartDateField.addValue(formattedDate);
    }
    if (validityEnd !== undefined) {
        let validityEndDateField = await businessPartnersPage.businessPartnerValidityEndDatePickerDate;
        //This field required a custom actions to enable interaction with it.
        await validityEndDateField.click(); // Click on the field to focus it
        if (process.platform === 'darwin') {
            // Use Meta + A to select all on macOS
            await chrome.keys(['Meta', 'a']);
        } else {
            // Use Control + A to select all on other operating systems (e.g., Ubuntu)
            await chrome.keys(['Control', 'a']);
        }
        await browser.keys('ArrowLeft'); // move the cursor to the beginning of the field
        let formattedDate = validityEnd.replace(/\s/g, ''); // Remove spaces from the lastCountDate
        await validityEndDateField.addValue(formattedDate);
    }
    if (tags !== undefined) {
        await commonPageElements.selectTypeaheadOption(await businessPartnersPage.businessPartnerTagsTypeahead, tags);
    }
    if (email !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerEmailField, email);
    }
    if (phoneNumber !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerPhoneNumberField, phoneNumber);
    }
    if (street !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerStreetField, street);
    }
    if (country !== undefined) {
        await commonPageElements.selectDropdownOption(await businessPartnersPage.businessPartnerCountryDropdown, country);
    }
    if (city !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerCityField, city);
    }
    if (state !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerStateField, state);
    }
    if (postalCode !== undefined) {
        await commonPageElements.fillInField(await businessPartnersPage.businessPartnerPostalCodeField, postalCode);
    }
});

Then(/^I verify that the previously saved business partner info is displayed on the edit business partner form$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'code', pageElement: businessPartnersPage.businessPartnerCodeField },
        { key: 'name', pageElement: businessPartnersPage.businessPartnerNameField },
        { key: 'language', pageElement: businessPartnersPage.businessPartnerLanguageDropdown },
        { key: 'timezone', pageElement: businessPartnersPage.businessPartnerTimezoneDropdown },
        { key: 'validityStart', pageElement: businessPartnersPage.businessPartnerValidityStarDatePickerDate },
        { key: 'validityEnd', pageElement: businessPartnersPage.businessPartnerValidityEndDatePickerDate },
        { key: 'tags', pageElement: businessPartnersPage.businessPartnerTagsTypeahead },
        { key: 'email', pageElement: businessPartnersPage.businessPartnerEmailField },
        { key: 'phoneNumber', pageElement: businessPartnersPage.businessPartnerPhoneNumberField },
        { key: 'street', pageElement: businessPartnersPage.businessPartnerStreetField },
        { key: 'country', pageElement: businessPartnersPage.businessPartnerCountryDropdown },
        { key: 'city', pageElement: businessPartnersPage.businessPartnerCityField },
        { key: 'state', pageElement: businessPartnersPage.businessPartnerStateField },
        { key: 'postalCode', pageElement: businessPartnersPage.businessPartnerPostalCodeField }
    ];

    for (const field of fieldsToCheck) {
        let expectedValue = data[field.key];
        if (field.key === 'code' && expectedValue === "automationBusinessPartnerCode") {
            expectedValue = randomBusinessPartnerCode.toUpperCase();
        }

        if (expectedValue !== undefined) {
            await browser.waitUntil(async () => {
                let inputValue;
                if ( field.key === 'timezone' || field.key === 'country' || field.key === 'language') {
                    const selectedOption = await field.pageElement.$('option:checked');
                    inputValue = await selectedOption.getText();
                } else {
                    inputValue = await field.pageElement.getValue();
                    console.log('Hola',inputValue)
                }
                return inputValue === expectedValue;
            }, {
                timeout: 30000, // Adjust timeout as necessary
                timeoutMsg: `Expected value for ${field.key} to be "${expectedValue}" but it was not found within the timeout period`
            });

            let inputValue;
            if ( field.key === 'timezone' || field.key === 'country' || field.key === 'language') {
                const selectedOption = await field.pageElement.$('option:checked');
                inputValue = await selectedOption.getText();
            } else {
                inputValue = await field.pageElement.getValue();
            }
            expect(inputValue).toEqual(expectedValue);
        }
    }
});


Then(/^I verify that the previously saved business partner info is displayed on the table as follows$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const { row, code, name, type, customer, supplier, streetAddress, cityName, region, addressTimezone, language, email, phoneNumber} = data;

    const verificationFields = {
        name: name,
        code: code,
        type: type,
        customer:customer,
        supplier:supplier,
        street:streetAddress,
        city:cityName,
        region: region,
        timezone:addressTimezone,
        language:language,
        email:email,
        phone:phoneNumber
    };

    await chrome.pause(5000); // UI delay

    for (const [field, value] of Object.entries(verificationFields)) {
        if (value !== undefined) {
            const valueToCheck = field === "code" && value === "automationBusinessPartnerCode"
                ? randomBusinessPartnerCode.toUpperCase()
                : value;
            await businessPartnersPage.checkExpectedLabelCellIs(row, field, valueToCheck);
        }
    }

    
});

When(/^I filter by column: "(.*)" on the business partners section$/, async (option:string) => {
    const filterByColumn = await filterElements.filterByColumn;
    await filterByColumn.waitForStable({timeout:15000});
    await commonPageElements.selectTypeaheadOption(filterByColumn,option);
});

When(/^I filter by text "(.*)" on the business partners term filter and ensure that a record is displayed$/, async (term: string) => {
    const maxAttempts = 2;
    let attempts = 0;
    let isMatch = false;

    async function filterAndCheck(expectedValue: string): Promise<boolean> {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, expectedValue);
        return chrome.waitUntil(async () => {
            try {
                await businessPartnersPage.checkExpectedLabelCellIs("1", "code", expectedValue.toUpperCase());
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
        if (term === "automationBusinessPartnerCode") {
            isMatch = await filterAndCheck(randomBusinessPartnerCode);
        } else {
            isMatch = await filterAndCheck(term);
        }
        attempts++;
    }

    if (!isMatch) {
        throw new Error(`Failed to filter and find the term: ${term} after ${maxAttempts} attempts`);
    }
});

When(/^I filter by text "(.*)" on business partners term filter$/, async (term: string) => {
    if (term === "automationBusinessParntnerCode") {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, randomBusinessPartnerCode);
    } else {
        await commonPageElements.fillFilterOnTerm(await filterElements.filterOnTextInput, term);
    }
});

Then(/^I verify "no results" is displayed on the business partners table$/, async () => {
    const noResultsLabel = await businessPartnersPage.noResultsLabel;
    await noResultsLabel.isDisplayed();
});


When(/^I remove all test business partners data$/, async () => {
    const businesPartnerIds = await getBusinessPartners.getAutomationBusinessPartners();

    if (businesPartnerIds.length === 0) {
        console.log("No business partner found to delete.");
    } else {
        // Iterate over each business partner ID and delete it
        for (const businessPartnerId of businesPartnerIds) {
            await deleteOneBusinessPartner.deleteBusinessPartner(businessPartnerId);
            console.log(`Deleted business partner with ID: ${businessPartnerId}`);
        }
    }
});

When(/^I create a business partner thru grahpql endpoint$/, async () => {
    await createOneBusinessPartner.createAutomationBusinessPartner();
});
