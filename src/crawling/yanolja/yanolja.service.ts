import { chromium, Page } from 'playwright';

export default class YanoljaService {
    async hotelSearch(hotelData: any) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();        

        
        const startYearMonthDay =hotelData.hotelStartDate;
        const endYearMonthDay = hotelData.hotelEndDate;

        const hotelName = hotelData.hotelName;

        await page.goto('https://www.yanolja.com/');

        await page.click('.HomeSearchBar_search__2wDcY');
        await page.waitForSelector('.Grid_grid__1fhJT');
        
        //호텔이름
        await page.click('.Grid_row__2j2mQ');
        await page.type('.SearchInput_input__342U2', hotelName);
        
        //날짜
        await page.click('.Grid_col__3hKRr');

        await page.click(`.CalendarDay_1.CalendarDay__default[aria-label="Selected as start date. ${startYearMonthDay}"]`);

        // 23일 선택
        await page.click(`.CalendarDay_1.CalendarDay__default[aria-label="Choose 금요일, ${endYearMonthDay} as your check-out date. It’s available."]`);
        


        // await this.clickDateButton(page, startYearMonthDay);
        // await this.clickDateButton(page, endYearMonthDay);
}



}


