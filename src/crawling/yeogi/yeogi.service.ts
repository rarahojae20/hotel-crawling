const puppeteer = require('puppeteer');
import { Browser } from 'puppeteer';
const { chromium } = require('playwright');

export default class YeogiService {

    public async hotelSearch(hotelData: any) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();

        // const startDate = hotelData.hotelStartDate;
        // const startDateParts = startDate.split('.');
        // const startDateDay = parseInt(startDateParts[2]); // 일을 숫자로 변환합니다.
        
        // const endDate = hotelData.hotelEndDate;
        // const endDateParts = endDate.split('.');
        // const endDateDay = parseInt(endDateParts[2]); // 일을 숫자로 변환합니다.
        

        const YearMonth = `${hotelData.hotelStartDate.slice(0, 4)}년 ${parseInt(hotelData.hotelStartDate.slice(5, 7))}월`;
        

        // 시작일과 종료일의 일(day) 부분 추출
        const startDateDay = parseInt(hotelData.hotelStartDate.split('.')[2]);
        const endDateDay = parseInt(hotelData.hotelEndDate.split('.')[2]);



        const hotelName = hotelData.hotelName;

        await page.goto('https://www.yeogi.com/');

        await page.waitForSelector('.css-8axmcj');
        await page.click('.css-8axmcj');

        await page.type('.css-59ixa7', hotelName);
        await page.click('.css-ip3fk1');
        
        
        await page.waitForSelector('.gc-calendar-month'); // 캘린더가 로드될 때까지 기다립니다.
        await goToMonthAndSelectDate(page, YearMonth);


        const startButton = await page.$(`.gc-calendar-month li button span:has-text("${startDateDay}")`);
        await startButton.click();

        const endButton = await page.$(`.gc-calendar-month li button span:has-text("${endDateDay}")`);
        await endButton.click();

        await page.click('.css-1ixudeb')
        await page.click('.css-14l0i74 button.gc-box-button');
        


        








        async function goToMonthAndSelectDate(page, targetYearMonth) {
            let found = false;
            
            while (!found) {
                // 대기하고 있는 달의 텍스트 가져오기
                const currentMonthText = await page.$eval('.gc-calendar-month p', element => element.textContent.trim());
                console.log(currentMonthText)
                // 현재 달이 목표하는 달인지 확인
                if (currentMonthText === targetYearMonth) {
                    found = true;
                } else {
                    // 해당 달의 달력에서 해당하는 날짜 찾기
                    // 다음 혹은 이전 달로 이동
                    const nextButton = await page.$('.css-1rfdmhx button:nth-child(2)');
                    await nextButton.click();
                    await page.waitForTimeout(1000); // 페이지가 로드될 때까지 대기 (조절 가능)
                }
            }
        }
                
        
    // 퍼피터

    //     await page.waitForSelector('.css-1mpp0bp');
    //     await page.click('.css-1mpp0bp');

    //     await page.waitForSelector('.py-Spacing04');
    //     await page.click('.py-Spacing04');



    //     await page.waitForSelector('.css-1yr88o5');
    //     await page.click('.css-1yr88o5');

    //     await page.type('.css-1yr88o5 input', hotelName);
    //     await page.keyboard.press('Enter');

    //     await page.waitForSelector('.css-16k3t8d');
    //     await page.waitForSelector('.css-16k3t8d button');

    //     await page.evaluate((startDateDay) => {
    //         const startDateButton = Array.from(document.querySelectorAll('.css-16k3t8d button span')).find(button => button.textContent.trim() === startDateDay);
    //         if (startDateButton) {
    //             startDateButton.closest('button').click();
    //         }
    //     }, startDateDay);

    //     await page.evaluate((endDateDay) => {
    //         const endDateButton = Array.from(document.querySelectorAll('.css-16k3t8d button span')).find(button => button.textContent.trim() === endDateDay);
    //         if (endDateButton) {
    //             endDateButton.closest('button').click();
    //         }
    //     }, endDateDay);

    //     await page.focus('.css-7pm2l');
    //     await page.waitForSelector('.gc-box-button.css-1ke8c0e');

    //     const button = await page.$('.gc-box-button.css-1ke8c0e');
    //     if (button) {
    //         await button.click();
    //     } else {
    //         console.error('버튼을 찾을 수 없음');
    //     }
    // }
}

    }