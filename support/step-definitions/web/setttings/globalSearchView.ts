import { When, DataTable, Then } from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { GlobalSearchView } from '../../../pageobjects/web/wms/globalSearchView';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let globalSearchView = new GlobalSearchView(chrome);


When(/^I enter "(.*)" in the search bar$/, async (searchTerm:string) => {
    const searchBar= await globalSearchView.globalSearchBar;
    await commonPageElements.fillInField(searchBar, searchTerm);

});

When(/^I click the search button$/, async () => {
    const searchButton = await globalSearchView.searchButton;
    await searchButton.click();
});

When(/^I click the cancel search button$/, async () => {
    const cancelSearchButton = await globalSearchView.cancelButton;
    await cancelSearchButton.click();
});


Then(/^I verify the global search info for products$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'product', pageElement: globalSearchView.productNameLabel },
        { key: 'description', pageElement: globalSearchView.productDescriptionLabel },
    ];

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (value !== undefined) {
            await browser.waitUntil(async () => {
                const inputValue = await field.pageElement.getText();
                return inputValue === value;
            }, {
                timeout: 60000, // maximum wait time in milliseconds
                timeoutMsg: `Expected value for ${field.key} did not match within the timeout period`
            });

            const inputValue = await (await field.pageElement).getText();
            expect(inputValue).toEqual(value);
        }
    }
});

Then(/^I verify the global search count$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    const fieldsToCheck = [
        { key: 'allResultsCount', pageElement: globalSearchView.allResultsLabelCount},
        { key: 'areaSearchCount', pageElement: globalSearchView.areaLabelCount},
        { key: 'productSearchCount', pageElement: globalSearchView.productLabelCount },
        { key: 'taskSearchCount', pageElement: globalSearchView.taskLabelCount },
        { key: 'binSearchCount', pageElement: globalSearchView.binLabelCount },
        { key: 'inboundDeliverySearchCount', pageElement: globalSearchView.inboundDeliveryLabelCount },
        { key: 'outboundFulfillmentSearchCount', pageElement: globalSearchView.outboundFulfillmentLabelCount},
        { key: 'licensePlateSearchCount', pageElement: globalSearchView.licensePlateLabelCount },
    ];

    for (const field of fieldsToCheck) {
        let value = data[field.key];
        if (value !== undefined) {
            await browser.waitUntil(async () => {
                const inputValue = await field.pageElement.getText();
                console.log('hola',inputValue)
                return inputValue === value;
            }, {
                timeout: 60000, // maximum wait time in milliseconds
                timeoutMsg: `Expected value for ${field.key} did not match within the timeout period`
            });

            const inputValue = await (await field.pageElement).getText();
            expect(inputValue).toEqual(value);
        }
    }
});

When(/^ $/, async () => {
    const cancelSearchButton = await globalSearchView.cancelButton;
    await cancelSearchButton.click();
});



