import HotelData from "src/models/hotel.model";

export default class HotelRepository {
  
    public async hotelCreate(hotelData: any, searchedHotelData: any, hotelSite: string) {
        const hotelName = searchedHotelData.hotelName; // 호텔 이름
        const startDate = hotelData.startdate; // 시작일
        const endDate = hotelData.enddate; // 종료일
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
}



