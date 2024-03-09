class TasksPageMobile {
    browser: WebdriverIO.Browser;

    constructor() {
        this.browser = browser;
    }

    public get moreActionsTask() {
        return this.browser.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button');
    }

    public get createTask() {
        return this.browser.$('//android.view.View[@content-desc="Create Task"]');
    }

    public get receivefromProductionTask() {
        return this.browser.$('//android.view.View[@content-desc="Receive from Production"]');
    }

    public get binToBiCreateTask() {
        return this.browser.$('//android.widget.ImageView[@content-desc="Bin to Bin"]');
    }

    public get binToBinCreateTaskLP() {
        return this.browser.$('//android.widget.ImageView[@content-desc="LP Bin to Bin"]');
    }

    get searchTask() {
        return this.browser.$('//android.widget.EditText');
    }

    async agendaUnload(idTask:string) {
        return this.browser.$(`//android.widget.ImageView[contains (@content-desc, "Unload - ${idTask}")]`);
    }
}
export { TasksPageMobile };