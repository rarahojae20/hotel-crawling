import { chromium, Page } from 'playwright';

export default class YeogiService {
    async hotelSearch(hotelData: any) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();        

        const YearMonth = `${hotelData.start.slice(0, 4)}년 ${parseInt(hotelData.start.slice(5, 7))}월`;
        const startDateDay = parseInt(hotelData.start.split('-')[2]);
        const endDateDay = parseInt(hotelData.end.split('-')[2]);
        const hotelName = hotelData.hotelName;
        
        await page.goto('https://www.yeogi.com/');
        await page.waitForSelector('.css-8axmcj');
        console.log(1)

        await page.click('.css-8axmcj');
        await page.type('.css-59ixa7', hotelName);
        await page.click('.css-ip3fk1');
        console.log(2)

        await page.waitForSelector('.gc-calendar-month'); 
        await this.goToMonthAndSelectDate(page, YearMonth);
        console.log(3)

        const startButton = await page.$(`.gc-calendar-month li button span:has-text("${startDateDay}")`);
        await startButton.click();
        console.log(4)

        const endButton = await page.$(`.gc-calendar-month li button span:has-text("${endDateDay}")`);
        await endButton.click();

        await page.click('.css-1ixudeb');
        await page.click('.css-14l0i74 button.gc-box-button');
        console.log(5)

        await page.waitForSelector('.css-1qrcwa');
        
        const hotelInfo = await this.getHotelInfo(page);
        return hotelInfo;
    }

    async getHotelInfo(page: Page) {
        const hotelName = await page.$eval('.gc-thumbnail-type-seller-card-title', element => element.textContent.trim());
        console.log(6)
        const price = await page.$eval('.css-yeouz0 .css-5r5920', element => element.textContent.trim());
        console.log(7)
        return { hotelName, price };

    }
    
    async goToMonthAndSelectDate(page: Page, targetYearMonth: string) {
        let found = false;
        
        while (!found) {
            const currentMonthText = await page.$eval('.gc-calendar-month p', element => element.textContent.trim());
            
            if (currentMonthText === targetYearMonth) {
                found = true;
            } else {
                const nextButton = await page.$('.css-1rfdmhx button:nth-child(2)');
                await nextButton.click();
                await page.waitForTimeout(1000);
            }
        }
    }
}