//hotel.controller.ts
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Result } from '../../common/result';
import logger from '../../lib/logger';
import HotelService from './hotel.service';

export default class HotelController {

    public getPrice = async (req: Request, res: Response) => {
        const hotelSites = req.params.hotelSite.toLowerCase().split(','); // 여러 호텔 사이트 받기
        
        const hotelName = req.query.hotelName as string; // 호텔 이름 가져오기
        const startdate = req.query.startDate as string; // 시작 날짜 가져오기
        const enddate = req.query.endDate as string; // 종료 날짜 가져오기
        const start = this.formatDate(startdate)
        const end = this.formatDate(enddate)

        const hotelData = {hotelName, start, end}
        const result: Record<string, any> = {}; // 객체로 변경


        try {
            const pricePromise = this.getPricePromise(hotelData, hotelSites); // 가격 정보를 가져오는 Promise
            const latestHotelPromise = this.getLatestHotelPromise(hotelData, hotelSites); // 최근 호텔 정보를 가져오는 Promise
            
            // 두 개의 Promise를 동시에 실행하여 결과를 기다림
            const [prices, latestHotelInfo] = await Promise.all([pricePromise, latestHotelPromise]);

            // 응답으로 반환
            res.status(httpStatus.OK).json({ prices, latestHotelInfo }); 
            
        } catch (error) {
            console.error("에러 발생:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "서버 에러" });
        }
    }

    

    private getPricePromise = async (hotelData: any, hotelSites: string[]) => {
        const result: Record<string, any> = {}; // 객체로 변경
    
        const requests = hotelSites.map(async (site: string) => {
            const hotelPrice = await new HotelService().getPrice(hotelData, site);
            return { [site]: hotelPrice };
        });
        const responses = await Promise.all(requests);
    
        responses.forEach((response) => {
            const site = Object.keys(response)[0];
            result[site] = response[site];
        });
        

        const cheaperHotel =  this.getCheaperHotel(result);
        const allResults = { ...result, cheaperHotel }; // cheaperHotel을 포함한 모든 검색 결과
    
        console.log(allResults);
        return allResults;
    }
        
    private getLatestHotelPromise = async (hotelData: any, hotelSites: string[]) => {
        const hotelName = hotelData.hotelName;
        const start = hotelData.start; // 검색 시작 날짜
        const end = hotelData.end; // 검색 종료 날짜

        const result: Record<string, any> = {}; // 객체로 변경
    
        const hotelInfoPromises = hotelSites.map(async (site: string) => {
            const hotelInfo = await new HotelService().getLatestHotelInfo(site, hotelName, start, end);
            return { [site]: hotelInfo };
        });
        const hotelInfos = await Promise.all(hotelInfoPromises);
    
        hotelInfos.forEach((info) => {
            const site = Object.keys(info)[0];
            result[site] = info[site];
        });
        return result;
    }
    

    public getCheaperHotel = (hotelInfos: { [site: string]: any }): { site: string, price: number | null } | null => {
        let minPrice: number | null = null;
        let cheaperHotel: { site: string, price: number | null } | null = null;
    
        // 모든 호텔 정보를 반복하여 최저가 호텔을 찾음
        for (const site in hotelInfos) {
            const price = hotelInfos[site] ? parseInt(hotelInfos[site].price.replace(',', '')) : null; // 가격 문자열을 숫자로 변환하여 비교
            // console.log("비교시보이는 가격은 ")
            // console.log(price)
            // 최저가가 아직 설정되지 않았거나, 현재 호텔이 더 저렴한 경우
            if (price !== null && (minPrice === null || price < minPrice)) {
                minPrice = price; // 최저가 업데이트
                cheaperHotel = { site, price }; // 최저가 호텔 업데이트
            }
        }
    
        return cheaperHotel; // 최저가 호텔 반환
    }
            
    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
}

