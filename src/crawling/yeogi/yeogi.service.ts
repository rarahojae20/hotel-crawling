const puppeteer = require('puppeteer');
import { Browser } from 'puppeteer';

export default class YeogiService {

    public async hotelSearch(hotelData: any) {
        const browser: Browser = await puppeteer.launch({
            headless: false
        });
    
        const startDate = hotelData.hotelStartDate;
        const startDateParts = startDate.split('.'); // 날짜를 분할
        const startDateDay = startDateParts[1]; // 날짜 부분만 가져오기
        console.log(startDateDay)


        const endDate = hotelData.hotelEndDate;
        const endDateParts = endDate.split('.'); // 날짜를 분할
        const endDateDay = endDateParts[1]; // 날짜 부분만 가져오기
        console.log(endDateDay)

        const hotelName = hotelData.hotelName;

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

        await page.type('.css-1yr88o5 input', hotelName);
        await page.keyboard.press('Enter');

        await page.waitForSelector('.css-16k3t8d'); // 캘린더가 로드될 때까지 대기
        
        await page.evaluate((startDateDay, endDateDay) => {
            const dateButtons = Array.from(document.querySelectorAll('.css-16k3t8d button'));
            for (const button of dateButtons) {
                if ((button as HTMLButtonElement).querySelector('span').innerText === startDateDay) {
                    (button as HTMLButtonElement).click();
                    break;
                }
            }
        
            for (const button of dateButtons) {
                if ((button as HTMLButtonElement).querySelector('span').innerText === endDateDay) {
                    (button as HTMLButtonElement).click();
                    break;
                }
            }
        }, startDateDay, endDateDay);
        
        await page.waitForSelector('.gc-box-button.css-1ke8c0e'); // 버튼이 나타날 때까지 대기
        console.log("버튼 찾아짐");
        
        // 버튼을 클릭합니다.
        await page.evaluate(() => { // evaluate로 수정
            const button = document.querySelector('.gc-box-button.css-1ke8c0e');
            if (button instanceof HTMLElement) {
                button.click();
            } else {
                console.error('버튼을 찾을 수 없음');
            }
        });
        
//document.querySelector('.gc-box-button.css-1ke8c0e').click():
//page.click('.gc-box-button.css-1ke8c0e')
//차이점 , 옆에박스는되고 여긴 이렇게되는 이유



        // const button = await page.$('.gc-box-button.css-1ke8c0e');
        // console.log("버튼 찾아짐")
        // await button.hover();
        // console.log("버튼 손댐")
        // await button.click();
        

            
        // await page.evaluate(() => {
        //     const dateButtons = Array.from(document.querySelectorAll('.css-16k3t8d button'));
        //     for (const button of dateButtons) {
        //         if ((button as HTMLButtonElement).querySelector('span').innerText === startDateDay) {
        //             (button as HTMLButtonElement).click();
        //             break;
        //         }
        //     }
        
        // });
        
        
        // await page.evaluate
        // await page.click('button.gc-box-button.css-1ke8c0e'); // 3박 적용 버튼 클릭
                

        



        // await page.click('css-z5h4lj');
        
        
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
