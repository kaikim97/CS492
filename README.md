# CS492
Real-time reservation service 

## Server

실시간 좌석 예약 시스템을 지원하는 서버입니다.

해당 서버는 Javascript 기반의 node.js express framework를 이용하여 작성되었습니다.
  
### 데이터베이스

본 서버에서는 클라우드 데이터베이스인 MongoDB Atlas를 사용하였고, mongoose 라이브러리를 이용하여 서버와 DB를 연결했습니다.

#### 데이터베이스 스키마

##### hall (공연장)
```bash
const hallSchema = new mongoose.Schema({
    title: {type: String, required: true},        
    date: {type: String, required: true},         
    time: {type: String, required: true},
    available: {type: Number, required: true },   // Number of available seats
    occupied: {                                   // Map of preoccupied or reserved seats
        type: Map,                                // Key: seatID
        of: {type: Boolean},                      // Value: true(reserved), false(preoccupied)
        default: {},
        required: true
     }
}
```

##### reservation (예약내역)
```bash
const reservationSchema = new mongoose.Schema({
  birth: { type: String, required: true },
  phone: { type: String, required: true },
  password: {type: String, required: true },
  title: { type: String, require: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: [String], required: true },
  price: { type: Number, required: true }
}
```
  
### 서버 실행

서버 실행은 server.js 파일이 위치한 폴더에서 이루어져야 합니다.

```bash
$ node server
```
  
### 서버 구성

```bash
├── models
│   ├── hall.js
│   └── reservation.js
├── routes
│   ├── halls.js
│   └── reservations.js
├── server.js
└── createData.js
```
  
📁 models : 오브젝트 스키마 및 필요한 함수 생성

      📓 hall.js : 특정 공연, 날짜, 시간에 해당하는 공연장의 정보를 나타내는 스키마
   
      📓 reservation.js : 예약 내역 정보를 나타내는 스키마
    
📁 routes : router 이용하여 서버 API상의 데이터 송/수신

      📓 halls.js : 공연장 정보 조회를 위한 API
      
            GET /halls : 전체 공연 list 조회
            GET /halls/hall?title=:title&date=:date&time:time : 특정 공연 조회 (title, date, time query로 입력)
            GET /halls/available?title=:title&date=:date : 해당 제목, 날짜의 모든 공연의 (시간, 잔여좌석) 정보 조회 (title, date query로 입력)
            POST /halls : 새로운 공연 정보 DB에 등록 (title, date, time, available body로 입력)
            DELETE /halls/hall?title=:title&date=:date&time:time : 특정 공연 DB에서 삭제 (title, date, time query로 입력)
   
      📓 reservation.js : 예약 내역 생성, 조회를 위한 API
      
            GET /reservations : 전체 예약 내역 조회
            GET /reservations/search?birth=:birth&phone=:phone&password=:password : 개인정보 및 비밀번호로 예약내역 조회 (query로 개인정보 및 비밀번호 입력)
            GET /reservations/:reservationId : 예약번호로 예약내역 조회 (예약번호 param으로 입력)
            POST /reservations : 새로운 예약 생성 및 생성된 예약 내역 반환 (개인정보 및 비밀번호 body로 전송)
            DELETE /reservations/:reservationId : 예약번호로 예약내역 삭제
   
📓 server.js : 서버 주소 설정, DB연결 등을 담당하는 서버 실행을 위한 가장 기본 Javascript 파일

📓 createData.js : DB에 초기 공연장 정보 저장을 위한 Javascript 파일, 서버 실행과는 별개로 작동
