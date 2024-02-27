import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Result } from '../../common/result';
import logger from '../../lib/logger';
import HotelService from './hotel.service';

export default class HotelController {

    public getPrice = async (req: Request, res: Response) => {
        const hotelData = req.body;
        const hotelSites = req.params.hotelSite.toLowerCase().split(','); // 여러 호텔 사이트 받기
        const result: Record<string, any> = {}; // 객체로 변경
    
        try {
            const requests = hotelSites.map(async (site: string) => {
                const hotelPrice = await new HotelService().getPrice(hotelData, site);
                return Result.ok<string>(hotelPrice).toJson();
            });
    
            
            const responses = await Promise.all(requests);
    
            hotelSites.forEach((site, index) => {
                result[site] = responses[index];
            });
    
            res.status(httpStatus.OK).json(result); 
        } catch (error) {
            console.error("에러 발생:", error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "서버 에러" });
        }
        console.log(JSON.stringify(result))
        return result;
    }
}
