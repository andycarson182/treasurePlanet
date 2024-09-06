import { CommonPageElements } from "../commonPageElements";

class OperationsPage {

    browser: WebdriverIO.Browser;
    commonPageElements = new CommonPageElements(browser);

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    public get deliveriesOverviewNumber() {
        return this.browser.$('[data-testid=deliveries-overview-num]');
    }
   
    public get openTasksNumber() {
        return this.browser.$('[data-testid=open-task-num]');
    }

    public get inboundDeliveriesTasksNumber() {
        return this.browser.$('[data-testid=inbound-deliveries-num]');
    }

    public get outboundDeliveriesNumber() {
        return this.browser.$('[ data-testid=outbound-deliveries-num]');
    }
    
}

export { OperationsPage };