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
        const hotelData = {hotelName, startdate, enddate}
        const result: Record<string, any> = {}; // 객체로 변경
        console.log (hotelData);
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
            return hotelPrice;
        });
        const responses = await Promise.all(requests);

        hotelSites.forEach((site, index) => {
            result[site] = responses[index];
        });

        return result;
    }

    private getLatestHotelPromise = async (hotelData: any, hotelSites: string[]) => {
        const hotelName = hotelData.hotelName;
        const result: Record<string, any> = {}; // 객체로 변경
    
        const hotelInfoPromises = hotelSites.map(async (site: string) => {
            const hotelInfo = await new HotelService().getLatestHotelInfo(site, hotelName);
            return { [site]: hotelInfo };
        });
        const hotelInfos = await Promise.all(hotelInfoPromises);
    
        hotelInfos.forEach((info) => {
            const site = Object.keys(info)[0];
            result[site] = info[site];
        });
    
        // 최저가 호텔 정보 계산
        const cheaperHotel = this.getCheaperHotel(hotelInfos);
    
        // 최저가 호텔 정보를 결과 객체에 추가
        result['cheaperHotel'] = cheaperHotel;
    
        return result;
    }
    
    public getCheaperHotel = (hotelInfos: { [site: string] : any }[]): { site: string, price: number | null } | null => {
        let minPrice: number | null = null;
        let cheaperHotel: { site: string, price: number | null } | null = null;
    
        hotelInfos.forEach((info) => {
            const site = Object.keys(info)[0];
            const price = info[site] ? info[site].price : null;
    
            if (price !== null && (minPrice === null || price < minPrice)) {
                minPrice = price;
                cheaperHotel = { site, price };
            }
        });
    
        return cheaperHotel;
    }    
}
