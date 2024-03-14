import { chromium, Page } from 'playwright';

export default class AgodaService {
    async hotelSearch(hotelData: any) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();        

        const hotelName = hotelData.hotelName;
        const startdate = hotelData.startdate;
        const enddate = hotelData.enddate;
        await page.goto('https://www.agoda.com/');
        
        await page.click('.IconBox__child')
        await page.type('.IconBox__child', hotelName);
        
        await page.waitForSelector('[data-selenium="suggestion-text"]');
        await page.click('[data-selenium="suggestion-text"]');
        
        await page.waitForSelector('[data-selenium="rangePickerCheckIn"]');
        await this.clickDateButton(page, startdate);
        await this.clickDateButton(page, enddate);

        await page.waitForSelector('[data-selenium="occupancyPicker"]');
        await page.click('[data-selenium="searchButton"]');

        const hotelInfo = await this.getHotelInfo(page);
        return hotelInfo;
    }

    async clickDateButton(page: Page, date: string) {
        let buttonSelector = `[data-selenium-date="${date}"]`;
        let isDatePresent = await page.$(buttonSelector);
        
        // 이전 버튼을 세 번 클릭하여 이전 달로 이동 (달력이 불규칙하게 켜짐)
        for (let i = 0; i < 3 && !isDatePresent; i++) {
            const previousMonthButtonSelector = '[data-selenium="calendar-previous-month-button"]';
            await page.click(previousMonthButtonSelector);
            await page.waitForTimeout(1000); 
            isDatePresent = await page.$(buttonSelector);
        }

        // 이전 달에서도 날짜를 찾지 못했을 경우에만 다음 달로 이동
        if (!isDatePresent) {
            const nextMonthButtonSelector = '[data-selenium="calendar-next-month-button"]';
            await page.click(nextMonthButtonSelector);
            await page.waitForTimeout(1000); // 대기 시간을 조정할 수 있습니다.
            buttonSelector = `[data-selenium-date="${date}"]`;
            isDatePresent = await page.$(buttonSelector);
        }
        
        await page.click(buttonSelector);
    }



    async getHotelInfo(page: Page) {
        try {
            await page.waitForSelector('.PropertyCardItem', { timeout: 10000 }); // 대기 시간을 10초로 늘림
    
            const hotelName = await page.$eval('.PropertyCardItem [data-selenium="hotel-name"]', element => element.textContent.trim());
            const price = await page.$eval('.PropertyCardItem [data-selenium="display-price"]', element => element.textContent.trim());
            return { hotelName, price };
        } catch (error) {
            console.error("호텔 정보를 찾을 수 없습니다:", error);
            return { hotelName: "", price: "" };
        }
    }
    
        
    }
