import { When} from '@wdio/cucumber-framework';
import { multiremotebrowser } from '@wdio/globals';
import { CommonPageElements } from '../../../pageobjects/web/commonPageElements';
import { SlottingDashboard } from '../../../pageobjects/web/slotting/slottingDashboardPage';

const chrome = multiremotebrowser.getInstance('chrome');
let commonPageElements = new CommonPageElements(chrome);
let slottingDashboardPage = new SlottingDashboard(chrome);


When(/^I click the create new simulation button$/, async () => {
    const createNewSimulationButton = await slottingDashboardPage.createNewSimulationButton;
    await commonPageElements.clickElement(createNewSimulationButton);
});

When(/^I click the go to simulation details button$/, async () => {
    const goToSimulationDetailsButton= await slottingDashboardPage.goToSimulationDetailsButton;
    await commonPageElements.clickElement(goToSimulationDetailsButton);
});

When(/^I select "currently deployed" tab$/, async () => {
    const goToSimulationDetailsButton= await slottingDashboardPage.currentlyDeployedTab;
    await commonPageElements.clickElement(goToSimulationDetailsButton);
});

When(/^I select "newest simulation" tab$/, async () => {
    const goToSimulationDetailsButton= await slottingDashboardPage.newestSimulationTab;
    await commonPageElements.clickElement(goToSimulationDetailsButton);
});

When(/^I click the data set stard date field$/, async () => {
    const dataSetSartDatePickerField= await slottingDashboardPage.datePickerFromField
    await commonPageElements.clickElement(dataSetSartDatePickerField);
});

When(/^I select day "(.*)" as data set start day picker$/, async (date:number) => {
    const dataSetSartDatePicker= await slottingDashboardPage.getDataSetStartDatePicker(date)
    await commonPageElements.clickElement(dataSetSartDatePicker);
});


When(/^I select day "(.*)" as data set end day picker$/, async (date:number) => {
    const dataSetEndDatePicker= await slottingDashboardPage.getDataSetEndDatePicker(date)
    await commonPageElements.clickElement(dataSetEndDatePicker);
});