

1. $ npm install
2. $ npx playwright install
3. Front/crawling_front$ npm install vue

실행방법
$ npm start
Front/crawling_front$ npm run serve

DB
CREATE TABLE SerachedHotelData (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site VARCHAR(255) NOT NULL,
  hotelName VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  searchTime DATETIME NOT NULL
);

