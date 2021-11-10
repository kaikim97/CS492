const express = require("express");
const mongoose = require("mongoose");

const app = express(); 

const PORT = 80;
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

app.use('/reservations', require('./routes/reservations'));
app.use('/halls', require('./routes/halls'));

app.listen(PORT, () => console.log("Server is Running..."));