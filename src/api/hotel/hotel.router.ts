//hotel.router.ts

import { Router } from 'express';
import HotelController from './hotel.controller';

export const path = '/hotel';
export const router = Router();

// router.get('/getLatestHotelInfo/:hotelSite', new HotelController().getLatestHotelInfo);
router.get('/:hotelSite', new HotelController().getPrice);