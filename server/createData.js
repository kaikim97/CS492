const Hall = require('./models/hall');
const mongoose = require("mongoose");
const express = require("express");

const app = express(); 
const cors = require('cors');

const MONGO_URI = "mongodb+srv://admin:admin12345@cluster0.pzm0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

mongoose.Promise = global.Promise;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

const titles = ["듄", "이터널스", "베놈2", "강릉"];
const dates = ["20211201", "20211202", "20211203", "20211204", "20211205", "20211206", "20211207"];
const times = ["0800", "1000", "1200", "1400", "1600", "1800", "2000", "2200"];

// upload to DB
titles.forEach(title =>
    dates.forEach(date => 
        times.forEach(time =>
            Hall.create({"title": title, "date": date, "time": time, "available": 551})
            .then(hall => console.log(hall))
            .catch(err => console.log(err))
        )    
    )    
);


// // delete from DB

// titles.forEach(title =>
//     dates.forEach(date => 
//         times.forEach(time =>
//             Hall.deleteByInfo(title, date, time)
//             .then(hall => console.log("deleted"))
//             .catch(err => console.log(err))
//         )    
//     )    
// );
