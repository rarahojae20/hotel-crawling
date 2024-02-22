//hotel.controller.ts

import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Result } from '../../common/result';
import logger from '../../lib/logger';
import HotelService from './hotel.service';

export default class HotelController {

    public getPrice = async(req:Request, res:Response) => {
        
        const hotelData = req.body;
        const hotelSite = req.params.hotelSite.toLowerCase();

        let result;

        const hotelPrice = await new HotelService().getPrice(hotelData, hotelSite);
        result = Result.ok<string>(hotelPrice).toJson();

        res.status(httpStatus.OK).json(result);

        return result;


    }

    

}