// 1. 서버 사용을 위해서 http 모듈을 http 변수에 담는다. (모듈과 변수의 이름은 달라도 된다.) 
//express 모듈 불러오기
const express = require("express");
const mongoose = require("mongoose");
//express 사용
const app = express(); 

const PORT = 8000;
const MONGO_URI = "mongodb+srv://admin:admin12345@cluster0.pzm0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose.Promise = global.Promise;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));


app.get("/", (req, res) => {
    res.send("Server is running");
});

// http listen port 생성 서버 실행
app.listen(PORT, () => console.log("Server is Running..."));