class DatePickerElement {
    browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }


    public get arrowRightIcon() {
        return this.browser.$('[data-testid=ArrowRightIcon]');
    }


    public get arrowLeftIcon() {
        return this.browser.$('[data-testid=ArrowLeftIcon]');
    }

    public get calendarDays() {
        return this.browser.$$('button.MuiPickersDay-dayWithMargin');
    }

    public get calendarMonthAndYearLabel() {
        return this.browser.$('.MuiPickersCalendarHeader-label');
    }

    public get okButton() {
        return this.browser.$("//button[contains(text(), 'OK')]")
    }

    public async getSpecificDay(dayText: string) {
        for (const day of await this.calendarDays) {
            if (await day.getText() === dayText) {
                return day;
            }
        }
        return null;
    }

    public async selectDate(targetMonth: string, targetYear: string, targetDay: string) {
        const targetMonthYear = `${targetMonth} ${targetYear}`;

        // Loop until the desired month and year are displayed
        while (true) {
            const currentMonthYear = await this.calendarMonthAndYearLabel.getText();

            if (currentMonthYear === targetMonthYear) {
                break; // Exit loop when the desired month and year are found
            }

            // Click the right arrow to move to the next month
            await this.arrowRightIcon.waitForClickable();
            await this.arrowRightIcon.click();
            await this.browser.pause(500); // Pause to allow the UI to update
        }

        // Select the desired day
        const dayToSelect = await this.getSpecificDay(targetDay);
        if (dayToSelect) {
            await dayToSelect.click();
        } else {
            console.log(`Day ${targetDay} not found in the calendar`);
        }
    }


    public async fillDateField(dateElement: WebdriverIO.Element, dateValue: string) {
        await dateElement.click();

        const isMacOS = process.platform === 'darwin';
        const isToday = dateValue.toLowerCase() === 'today';
        let targetDate;

        if (isToday) {
            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-US', {
                month: isMacOS ? '2-digit' : 'long',
                year: 'numeric',
                day: isMacOS ? '2-digit' : 'numeric'
            });

            if (isMacOS) {
                await browser.keys(['Meta', 'a']); // Select all text (Meta + A)
                await browser.keys('ArrowLeft');
                const date = formattedDate.replace(/\//g, '');
                await dateElement.addValue(date);
            } else {
                const [month, day, year] = formattedDate.split(' ');
                targetDate = { month, year, day: day.replace(',', '') };
            }
        } else {
            await browser.keys(['Meta', 'a']);
            await browser.keys('ArrowLeft');
            await dateElement.addValue(dateValue);
        }

        if (!isMacOS && targetDate) {
            await this.selectDate(targetDate.month, targetDate.year, targetDate.day);
            const okButton = await this.okButton;
            await okButton.click();
        } else if (!targetDate) {
            console.log('Date format not recognized or not handled');
        }
    }

    public async fillDateTimeField(dateElement: WebdriverIO.Element, dateValue: string) {
        await dateElement.click();
        console.log('Andres2')
        const isMacOS = process.platform === 'darwin';
        const isToday = dateValue.toLowerCase() === 'today';
        let targetDate;

        if (isToday) {
            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-US', {
                month: isMacOS ? '2-digit' : 'long',
                year: 'numeric',
                day: isMacOS ? '2-digit' : 'numeric',
                // hour: '2-digit',
                // minute: '2-digit',
                // hour12: false // Use 24-hour time format
            });

            if (isMacOS) {
                console.log('GOKU');
                const [datePart /*, timePart*/] = formattedDate.split(', '); // Adjust the split based on your locale's format
                await browser.keys(['Meta', 'a']);
                await browser.keys('ArrowLeft');
                const formattedDatePart = datePart.replace(/\//g, ''); 
                console.log('Formatted Date Part:', formattedDatePart);
                await dateElement.addValue(formattedDatePart);
                // console.log('Time Part:', timePart);
                await dateElement.addValue("0000"); //pass the timePart if you want to send the current time
            } else {
                console.log('KRilin');
                const [month, day, year] = formattedDate.split(' ');
                targetDate = { month, year, day: day.replace(',', '') };
            }
        } else {
            console.log('Vegueta');
            console.log(`Date Value: ${dateValue}`);

            await browser.keys(['Meta', 'a']);
            await browser.keys('ArrowLeft');
            const [datePart, timePart] = dateValue.split(' '); // Separate date and time
            const formattedDate = datePart.replace(/\//g, ''); // Format the date part
            await dateElement.addValue(formattedDate); // Enter the date part
            
            // Move the cursor to the position where the time needs to be entered
            await browser.keys('Arrowleft'); // Move to after the date
            
            // Now enter the time part
            await dateElement.addValue(timePart);
        }

        if (!isMacOS && targetDate) {
            await this.selectDate(targetDate.month, targetDate.year, targetDate.day);
            const okButton = await this.okButton;
            await okButton.click();
        } else if (!targetDate) {
            console.log('Date format not recognized or not handled');
        }
    }
}

export { DatePickerElement };