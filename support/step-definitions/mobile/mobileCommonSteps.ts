import {  Then } from '@wdio/cucumber-framework';
import {  multiremotebrowser } from '@wdio/globals'

const appium = multiremotebrowser.getInstance('appium');

Then(/^Just wait "(.*)" for mobile$/, async (time:number) => {
    await appium.pause(time);
});


