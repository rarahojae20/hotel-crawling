// document.addEventListener("DOMContentLoaded", function() {
//     const searchButton = document.getElementById("searchButton");
//     searchButton.addEventListener("click", async function() {
//         const hotelName = document.getElementById("hotelName").value;
//         const startDate = document.getElementById("startDate").value;
//         const endDate = document.getElementById("endDate").value;

//         try {
//             const response = await fetch(`/v1/hotel/getLatestHotelInfo/yeogi,agoda?hotelName=${hotelName}&startDate=${startDate}&endDate=${endDate}`);
//             const data = await response.json();
//             console.log(data); // 백엔드에서 받은 데이터 출력
//             // 받은 데이터를 화면에 표시하거나 필요한 작업 수행
//         } catch (error) {
//             console.error('데이터 가져오기 실패:', error);
//             // 오류 처리
//         }
//     });
// });
