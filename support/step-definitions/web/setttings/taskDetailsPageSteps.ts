import { When, DataTable } from '@wdio/cucumber-framework';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { DatePickerElement} from '../../../pageobjects/web/datePickerElement';
import { TaskDetailsPage } from '../../../pageobjects/web/wms/taskDetailsPage';
import { multiremotebrowser } from '@wdio/globals';


const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let datePickerElement = new DatePickerElement(chrome);
let taskDetailsPage = new TaskDetailsPage(chrome);

When(/^I click the task details edit button$/, async () => {
    const taskDetailsEditButton = await taskDetailsPage.taskDetailsEditButton;
    await commonPageElements.clickElement(taskDetailsEditButton );
});

When(/^I fill in the edit task details info$/, async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];

    const fieldActions = {
        team: async () => {
            await commonPageElements.selectDropdownOption(await taskDetailsPage.taskDetailsTeamDropdown, data.team);
        },
        dueDate: async () => {
            await datePickerElement.fillDateField( await taskDetailsPage.taskDetailsDueDateField, data.dueDate);
        },        
        sourceLot: async () => {
            await commonPageElements.selectTypeaheadOption(await taskDetailsPage.taskDetailsSourceLotTypeahead, data.sourceLot);
        },
        destinationLot: async () => {
            await commonPageElements.selectTypeaheadOption(await taskDetailsPage.taskDetailsDestinationLotTypeahead, data.destinationLot);
        },
        sourceBin: async () => {
            await commonPageElements.selectTypeaheadOption(await taskDetailsPage.taskDetailsSourceBinTypeahead, data.sourceBin);
        },
        destinationBin: async () => {
            await commonPageElements.selectTypeaheadOption(await taskDetailsPage.taskDetailsDestinationBinTypeahead, data.destinationBin);
        },
    };

    for (const [key, action] of Object.entries(fieldActions)) {
        if (data[key] !== undefined) {
            await action();
        }
    }
});






