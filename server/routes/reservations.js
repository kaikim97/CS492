const router = require("express").Router();
const Reservation = require("../models/reservation");
const Hall = require("../models/hall");

// Find All
router.get("/", (req, res) => {
  Reservation.findAll()
    .then((reservations) => {
      res.send(reservations);
    })
    .catch((err) => res.status(500).send(err));
});

// Find One by Birth, Phone
router.get("/search", (req, res) => {
  let birth = req.query.birth;
  let phone = req.query.phone;
  let password = req.query.password;
  Reservation.findQuery(birth, phone, password)
    .then((reservations) => {
      if (reservations.length == 0)
        return res
          .status(404)
          .send({ err: "Reservation not found or invalid password" });
      res.send(reservations);
    })
    .catch((err) => res.status(500).send(err));
});

// Find One by Id
router.get("/:reservationId", (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation)
        return res.status(404).send({ err: "Reservation not found" });
      res.send(reservation);
    })
    .catch((err) => res.status(500).send(err));
});

// Create new reservation
router.post("/", (req, res) => {
  Hall.findOneByInfo(req.body.title, req.body.date, req.body.time)
    .then((hall) => {
      if (!hall)
        return res.status(404).send({
          err: "Hall not found",
        });

      req.body.seats.forEach(function (seatID) {
        if (hall.occupied.has(seatID) && hall.occupied.get(seatID) == true) {
          return res.status(404).send({ err: "Already reserved seat" });
        }
      });

      Reservation.create(req.body)
        .then((reservation) => {
          hall.available = hall.available - req.body.seats.length;
          req.body.seats.forEach(function (seatID) {
            // TODO: Seat 상태에 따라 T/F 바꿔야 됨
            hall.occupied.set(seatID, true);
          });
          hall.save();
          res.send(reservation);
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

// Update reservation
router.put("/:reservationId", (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation)
        return res.status(404).send({ err: "Reservation not found" });
      reservation.birth = req.body.birth;
      reservation.phone = req.body.phone;
      reservation.password = req.body.password;
      reservation.price = req.body.price;
      reservation.save();
      res.send(reservation);
    })
    .catch((err) => res.status(500).send(err));
});

// Delete reservation by ID
router.delete("/:reservationId", (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      Hall.findOneByInfo(reservation.title, reservation.date, reservation.time)
        .then((hall) => {
          hall.available = hall.available + reservation.seats.length;
          reservation.seats.forEach(function (seatID) {
            hall.occupied.delete(seatID);
          });
          hall.save();
          return Reservation.deleteById(req.params.reservationId);
        })
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
