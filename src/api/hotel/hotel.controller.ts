import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Result } from '../../common/result';
import logger from '../../lib/logger';
import HotelService from './hotel.service';

export default class HotelController {

    public getPrice = async (req: Request, res: Response) => {
        const hotelSites = req.params.hotelSite.toLowerCase().split(','); // 여러 호텔 사이트 받기
        
        const hotelName = req.query.hotelName as string; // 호텔 이름 가져오기
        const startDate = req.query.startDate as string; // 시작 날짜 가져오기
        const endDate = req.query.endDate as string; // 종료 날짜 가져오기
        const hotelData = {hotelName, startDate, endDate}
        const result: Record<string, any> = {}; // 객체로 변경
    
        try {
            const requests = hotelSites.map(async (site: string) => {
                const hotelPrice = await new HotelService().getPrice(hotelData, site);
                return hotelPrice;
            });
    
            const responses = await Promise.all(requests);

            hotelSites.forEach((site, index) => {
                result[site] = responses[index];
            });
    
            console.log(JSON.stringify(result));

            res.status(httpStatus.OK).json(result); 
            
        } catch (error) {
            console.error("에러 발생:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "서버 에러" });
        }
    }

    public getLatestHotelInfo = async (req: Request, res: Response) => {
        const hotelName = req.body.hotelName as string; // 호텔 이름 가져오기
        const hotelSites = req.params.hotelSite.toLowerCase().split(','); // 여러 호텔 사이트 받기

        try {
            // 각 사이트에서 가장 최근에 검색한 호텔 정보 가져오기
            const hotelInfoPromises = hotelSites.map(async (site: string) => {
                const hotelInfo = await new HotelService().getLatestHotelInfo(site, hotelName);
                return { [site]: hotelInfo };
            });
    
            // 모든 호텔 정보를 한꺼번에 가져오기
            const hotelInfos = await Promise.all(hotelInfoPromises);
    
            // 가장 저렴한 호텔 정보 찾기
            const cheaperHotel = this.getCheaperHotel(hotelInfos);
    
            // 응답으로 반환
            res.status(httpStatus.OK).json({ hotelInfos, cheaperHotel });
        } catch (error) {
            console.error('호텔 정보 조회 중 에러 발생:', error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: '서버에러' });
        }
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
