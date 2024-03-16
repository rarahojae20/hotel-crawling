import HotelData from "src/models/hotel.model";

export default class HotelRepository {
  
    public async hotelCreate(hotelData: any, searchedHotelData: any, hotelSite: string) {
        const hotelName = hotelData.hotelName; // 호텔 이름
        const startDate = hotelData.start; // 시작일
        const endDate = hotelData.end; // 종료일
        const site = hotelSite;
        const price = parseFloat(searchedHotelData.price.replace(/,/g, '')); // 쉼표를 제거하고 숫자로 변환

        // 호텔 사이트와 호텔 이름으로 데이터를 구분하여 DB에 삽입
        const hotelInfo = {
            hotelName: hotelName, //body.hotelName을 사용할지, searchedHotelData.hotelName을사용할지
            site: site,
            startDate: startDate,
            endDate: endDate,
            searchTime: new Date(),
            price: price // 가격
        };

        return await HotelData.create(hotelInfo);
    }

    
    public async getLatestHotelInfo(site: string, hotelName: string, start: string, end: string) {
        console.log(site)
        console.log(hotelName)

        console.log(start)

        console.log(end)

        const startDate = new Date(start);
        const endDate = new Date(end);
    
        try {
                const latestHotelInfo = await HotelData.findOne({
                where: {
                    site: site,
                    hotelName: hotelName,
                    startDate: startDate,
                    endDate: endDate
                },
                order: [['searchTime', 'DESC']], // 최신 데이터를 가져오기 위해 검색 시간을 기준으로 내림차순으로 정렬
            });
    
            return latestHotelInfo;
        } catch (error) {
            console.error('호텔 정보 가져오기 중 에러 발생:', error);
            throw new Error('호텔 정보를 가져오는 데 실패했습니다.');
        }
    }
    
    
}



