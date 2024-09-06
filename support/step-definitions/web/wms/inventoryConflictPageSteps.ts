import { When, Then } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { InventoryConflictsPage} from '../../../pageobjects/web/wms/inventoryConflictsPage';
import { multiremotebrowser } from '@wdio/globals';
import { licensePlateCode } from './inventoryPageSteps';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let inventoryConflictsPage = new InventoryConflictsPage(chrome);


When(/^I click the resolve conflicts button$/, async () => {
    const resolveConflictsButton= await inventoryConflictsPage.resolveConflictsButton;
    await commonPageElements.clickElement(resolveConflictsButton);
});

When(/^I verify the modal title is "(.*)"$/, async (title:string) => {
    const modalTitle= await inventoryConflictsPage.modalTitle;
    const modalTitleText = await modalTitle.getText();
    expect(modalTitleText).toEqual(title);
});

Then(/^I verify the modal description is "(.*)"$/, async (expectedMessage) => {
    const modalDescription = await inventoryConflictsPage.modalDescription;
    const modalDescriptionText = await modalDescription.getText();

    if (expectedMessage === "License Plate could not be found in the ERP system...") {
        const expectedText = `License Plate ${licensePlateCode} could not be found in the ERP system, would you like to cancel this License Plate and remove it from your inventory?`;
        await expect(modalDescriptionText).toEqual(expectedText);
    } else if(expectedMessage === "License Plate has been issued out of your inventory") {
        const expectedText = `License Plate ${licensePlateCode} has been issued out of your inventory`;
        await expect(modalDescriptionText).toEqual(expectedText);
    }else {
        await expect(modalDescriptionText).toEqual(expectedMessage);
    }
});


Then(/^I verify the confirmation modal title is "Cancel License Plate ..."$/, async () => {
    const expectedConfirmationModalTitle  = `Cancel License Plate ${licensePlateCode}`;;
    const confirmationModalTitle = await inventoryConflictsPage.confirmationModalTitle;
    const confirmationModalTitleText = await confirmationModalTitle.getText();
    await expect(confirmationModalTitleText).toEqual( expectedConfirmationModalTitle);
});

Then(/^I verify the confirmation modal description is "(.*)"$/, async (expectedConfirmationModalDescription:string) => {
    const confirmationModalDescription = await inventoryConflictsPage.confirmationModalDescription;
    const confirmationModalDescriptionText = await confirmationModalDescription.getText();
    await expect(confirmationModalDescriptionText).toEqual(expectedConfirmationModalDescription);
});

When(/^I check the success inventory conflict snackbar message is "License Plate has been canceled and an Issue Stock task was successfully created."$/, async () => {
    const expectedMessage = `License Plate ${licensePlateCode} has been canceled and an Issue Stock task was successfully created.`;
    const snackbarSuccessMessage = await commonPageElements.snackbarSuccessMessage;

    await browser.waitUntil(
        async () => {
            const actualMessage = await snackbarSuccessMessage.getText();
            return actualMessage === expectedMessage;
        },
        {
            timeout: 6000, // Adjust timeout as necessary
            timeoutMsg: `Expected snackbar success message to be "${expectedMessage}", but it was not found within the timeout period.`
        }
    );

    const finalMessage = await snackbarSuccessMessage.getText();
    expect(finalMessage).toEqual(expectedMessage);
})

Then(/^I verify the resolve conflicts button is "(enabled|disabled)"$/, async (state: string) => {
    const resolveConflictsButton = await inventoryConflictsPage.resolveConflictsButton;

    // Wait for the button to be in the expected state for up to 60 seconds
    await browser.waitUntil(
        async () => {
            const isButtonEnabled = await resolveConflictsButton.isEnabled();
            return state === "enabled" ? isButtonEnabled : !isButtonEnabled;
        },
        {
            timeout: 60000, // 60 seconds
            timeoutMsg: `Expected the "Resolve Conflicts" button to be ${state}, but it wasn't within the timeout period.`
        }
    );

    // Re-check the button state after the wait
    const isButtonEnabled = await resolveConflictsButton.isEnabled();
    if (state === "enabled") {
        expect(isButtonEnabled).toBe(true); 
    } else if (state === "disabled") {
        expect(isButtonEnabled).toBe(false); 
    } else {
        throw new Error("Invalid state option provided. Use 'enabled' or 'disabled'.");
    }
});

Then(/^I verify the tooltip message is "(.*)"$/, async (message: string) => {
    const tooltipMessage = await inventoryConflictsPage.getTooltipMessage(message);
    
    await browser.waitUntil(async () => {
        return await tooltipMessage.isExisting();
    }, {
        timeout: 60000,
        timeoutMsg: 'Expected the tooltip span to exist within 60 seconds.'
    });

    if (await tooltipMessage.isDisplayed()) {
        console.log(`The tooltip message is: "${message}"`);
    }
});


When(/^I verify the fulfilld values match with SAP value$/, async function () {
    const compareValues = async (fulfilldElement: any, sapElement: any) => {
        await browser.waitUntil(async () => {
            const fulfilldValue = await fulfilldElement.getText();
            const sapValue = await sapElement.getText();
            return fulfilldValue === sapValue;
        }, {
            timeout: 30000, // 30 seconds
            timeoutMsg: 'Expected values to match within 30 seconds.'
        });

        const fulfilldValue = await fulfilldElement.getText();
        const sapValue = await sapElement.getText();
        expect(fulfilldValue).toEqual(sapValue);
    };

    // Compare all fields
    await compareValues(inventoryConflictsPage.fulfilldLicensePlateValue, inventoryConflictsPage.sapLicensePlateValue);
    await compareValues(inventoryConflictsPage.fulfilldProductCodeValue, inventoryConflictsPage.sapProductCodeValue);
    await compareValues(inventoryConflictsPage.fulfilldLotCodeValue, inventoryConflictsPage.sapLotCodeValue);
    await compareValues(inventoryConflictsPage.fulfilldAvailabilityValue, inventoryConflictsPage.sapAvailabilityValue);
    await compareValues(inventoryConflictsPage.fulfilldStockStatusValue, inventoryConflictsPage.sapStockStatusValue);
    await compareValues(inventoryConflictsPage.fulfilldQuantityValue, inventoryConflictsPage.sapQuantityValue);
    await compareValues(inventoryConflictsPage.fulfilldUoMValue, inventoryConflictsPage.sapUoMValue);
});


