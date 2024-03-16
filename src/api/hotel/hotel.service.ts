import YeogiService from '../../crawling/yeogi/yeogi.service';
import YanoljaService from '../../crawling/yanolja/yanolja.service';
import AgodaService from '../..//crawling/agoda/agoda.service';
import HotelRepository from './hotel.repository';


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

        const searchedHotelData = await service.hotelSearch(hotelData);
       await new HotelRepository().hotelCreate(hotelData, searchedHotelData, hotelSite); // HotelRepository로 데이터 저장

        return searchedHotelData;
    }


    public async getLatestHotelInfo(site: string, hotelName: string, start:string, end:string) {
        
        try {
            return await new HotelRepository().getLatestHotelInfo(site, hotelName,start, end);
        } catch (error) {
            console.error('호텔 정보 가져오기 중 에러 발생:', error);
            throw new Error('호텔 정보를 가져오는 데 실패습니다.');
        }
    }
}

