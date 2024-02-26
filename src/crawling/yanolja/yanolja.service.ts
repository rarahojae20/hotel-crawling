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


        
        await this.clickDateButton(page, startYearMonthDay);
        // 체크아웃 날짜 선택
        await this.clickDateButton(page, endYearMonthDay);




        // await this.clickDateButton(page, startYearMonthDay);
        // await this.clickDateButton(page, endYearMonthDay);
}
async clickDateButton(page: Page, dateLabel: string) {
    const matchResult = dateLabel.match(/(\w+), (\d+)년 (\d+)월 (\d+)일/);
    if (matchResult) {
        const [, day, month, year] = matchResult; // 날짜에서 요일, 월, 년 추출
        const buttonSelector = `.CalendarDay[aria-label*="${day}일"][aria-label*="${month}월"][aria-label*="${year}년"]`;
        console.log(buttonSelector);
        await page.click(buttonSelector);
    } else {
        console.error('Date label format does not match expected pattern.');
    }
}


}





