//hotel.service.ts

import YeogiService from '../../crawling/yeogi/yeogi.service';
import YanoljaService from '../..//crawling/yanolja/yanolja.service';
export default class HotelService {
	public getPrice = async (hotelData: any, hotelSite: string) => {
		let ret;

		switch (hotelSite) {
		case 'yeogi': 
		ret = await new YeogiService().hotelSearch(hotelData);
        break;
        case 'yanolja': 
        ret = await new YanoljaService().hotelSearch(hotelData);
		break;
        

	}

    return ret;
}

}