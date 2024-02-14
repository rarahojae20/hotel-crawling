//v1.router.ts
import { Router } from 'express';

// import * as translate from './translate/translate.router';
// import * as delivery from './delivery/delivery.router'
import * as hotel from '../api/hotel/hotel.router';


export const router = Router();
export const path = '/v1';

 router.use(hotel.path, hotel.router);
// router.use(delivery.path, delivery.router);

