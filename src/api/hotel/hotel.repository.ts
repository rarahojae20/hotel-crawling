// import HotelData from "src/models/hotel.model";

// export default class HotelRepository {
  
//     public async create(hotelData, searchedHotelData, hotelSite) {
//         const hotelName = searchedHotelData.hotelName; // 호텔 이름
//         const startDate = hotelData.startDate; // 시작일
//         const endDate = hotelData.endDate; // 종료일
//         const site = hotelSite;
//         const price = searchedHotelData.price

//         console.log(hotelName,startDate,endDate,site,price)

//         // 호텔 사이트와 호텔 이름으로 데이터를 구분하여 DB에 삽입
//         const hotelInfo = {
//             hotelName: hotelName,
//             site: site,
//             startDate: startDate,
//             endDate: endDate,
//             searchTime: new Date(),
//             price: price // 가격
//         };

//         await HotelData.create(hotelInfo);
//     }
// }
