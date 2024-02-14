const puppeteer = require('puppeteer');
import { Browser } from 'puppeteer';

export default class YeogiService {

    public async hotelSearch(hotelData: any) {
        const browser: Browser = await puppeteer.launch({
            headless: false
        });
    
        const url = 'https://www.yeogi.com/'; // URL 변수 정의 필요
        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForSelector('.css-i51owg');
        await page.click('.css-i51owg');
    
        // 두 번째 클릭하여 검색창 나타나기
        await page.waitForSelector('.css-1mpp0bp');
        await page.click('.css-1mpp0bp');
        

        await page.waitForSelector('.py-Spacing04');
        await page.click('.py-Spacing04');

        await page.waitForSelector('.css-1yr88o5');
        await page.click('.css-1yr88o5');

        
        
        // await page.waitForNavigation();
        // await page.waitForSelector('.css-19sk4h4');
        // await page.click('.css-19sk4h4');

        // await page.click('.css-1hqxmps');
    
        // await page.type('input[type="text"]', hotelData.hotelName);
    
        // await page.waitForNavigation();
    
        // 검색 결과 페이지에서 다른 작업을 수행할 수 있습니다.
    
        // await browser.close();
    }
    

// public async getHotelName(hotelData: any) {
//     const browser: Browser = await puppeteer.launch({
//     headless: false
// });

// const url = 'https://www.yeogi.com/domestic-accommodations?keyword=%EC%84%9C%EC%9A%B8&searchType=KEYWORD&checkIn=2024-02-15&checkOut=2024-02-16&personal=2&freeForm=true'; 
// //검색에서 받아온 하이퍼링크 삽입
// // URL 변수 정의 필요
// const page = await browser.newPage();
// await page.goto(url);

// const hotelPrices = await page.evaluate(() => {
//     const hotelPriceElements = Array.from(document.querySelectorAll('.gc-thumbnail-type-seller-card-title'));
//     const hotelNames = hotelPriceElements.map((info: any) => ({
//         hname: info.textContent.trim() 
//     }));

//     return hotelNames;
// });

// await browser.close();
// return hotelPrices;
// }

}
