import YeogiService from '../../crawling/yeogi/yeogi.service';
import YanoljaService from '../../crawling/yanolja/yanolja.service';
import AgodaService from '../..//crawling/agoda/agoda.service';
// import HotelRepository from './hotel.repository';

// 각 호텔 사이트에 대한 서비스 객체를 나타내는 인터페이스
interface HotelSiteService {
    hotelSearch(hotelData: any): Promise<any>;
}

export default class HotelService {
    private siteServices: Record<string, HotelSiteService>;

    constructor() {
        this.siteServices = {
            yeogi: new YeogiService(),
            yanolja: new YanoljaService(),
            agoda: new AgodaService(),
        };
    }

    public getPrice = async (hotelData: any, hotelSite: string) => {
        const service = this.siteServices[hotelSite.toLowerCase()];

        if (!service) {
            throw new Error(`Unsupported hotel site: ${hotelSite}`);
        }

        const searchedHotelData = await service.hotelSearch(hotelData); //이게문제됨브라우저여러창
        // await this.create(hotelData,searchedHotelData,hotelSite )

        return searchedHotelData;
    }

    // public create = async (hotelData,searchedHotelData,hotelSite) => {
    //     const result = await new HotelRepository().create(hotelData,searchedHotelData,hotelSite);
    //     return result;
    //   };
}
