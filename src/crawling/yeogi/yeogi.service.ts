const puppeteer = require('puppeteer');
import { Browser } from 'puppeteer';

export default class YeogiService {
    
    public async getPrice(hotelData: any) {
        const browser: Browser = await puppeteer.launch({
            headless: false
        });

        const url = 'https://www.yeogi.com/domestic-accommodations?keyword=%EC%84%9C%EC%9A%B8&searchType=KEYWORD&checkIn=2024-02-15&checkOut=2024-02-16&personal=2&freeForm=true'; // URL 변수 정의 필요
        const page = await browser.newPage();
        await page.goto(url);
        
        const hotelPrices = await page.evaluate(() => {
            // 페이지 내의 호텔 가격 요소들을 선택
            const hotelPriceElements = Array.from(document.querySelectorAll('.gc-thumbnail-type-seller-card-title'));
            // 각 요소의 텍스트 내용을 배열에 저장하여 반환
            const hotelNames = hotelPriceElements.map((info: any) => ({
                hname: info.textContent.trim() // 호텔 이름 가져오기
            }));

            return hotelNames;
        });

        await browser.close();
        return hotelPrices;
    }
}

//         try {
//             // 검색 페이지로 이동
//             await page.goto(url , { timeout: 60000 }); // 60초로 타임아웃 설정
            
//             // 검색 필드에 포커스 설정 후 값을 입력
//             await page.focus('.css-13l7akb'); // 입력 필드에 포커스 설정
//             await page.keyboard.type(hotelData.hotelName);
            
//             // 검색 버튼 클릭
//             const handle = await page.waitForSelector('button.gc-box-button.css-1ke8c0e', { visible: true });
//             await Promise.all([
//                 await handle.click()
//                 page.waitForNavigation({ waitUntil: 'networkidle0' }), // 네트워크 요청이 없을 때까지 대기
//             ]);
            
//             console.log("검색 버튼 클릭 완료");
            
//             // 결과 페이지에서 호텔 이름과 가격 확인
//             const hotelName = await page.$eval('h3.gc-thumbnail-type-seller-card-title.css-1asqkxl', element => element.textContent);
//             const priceText = await page.$eval('span.css-1qdxuc0', element => element.textContent);
            
//             if (hotelName === hotelData.hotelName && priceText) {
//                 const price = parseFloat(priceText.replace(',', ''));
//                 return price;
//             } else {
//                 return null; // 호텔 이름이나 가격이 맞지 않는 경우 null 반환
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             return null; // 에러 발생 시 null 반환
//         } finally {
//             await browser.close();
//         }
//     }
// }
