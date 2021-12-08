const router = require("express").Router();
const Reservation = require("../models/reservation");
const Hall = require("../models/hall");
const { gql, useMutation } = require("@apollo/client");
const { request } = require("graphql-request");

const deleteReservation = gql`
  mutation Mutation($id: ID) {
    deleteReservation(_id: $id) {
      _id
      title
      date
      time
      seats
    }
  }
`;

// Get all reservation objects
router.get("/", (req, res) => {
  Reservation.findAll()
    .then((reservations) => {
      res.send(reservations);
    })
    .catch((err) => res.status(500).send(err));
});


// Get one reservation object by birth, phone, and password.
router.get("/search", (req, res) => {
  const birth = req.query.birth;
  const phone = req.query.phone;
  const password = req.query.password;
  Reservation.findQuery(birth, phone, password)
    .then((reservation) => {
      if (!reservation) return res.send(null);
      res.send(reservation);
    })
    .catch((err) => res.status(500).send(err));
});

// Find one reservation by Id
router.get("/:reservationId", (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) return res.send(null);
      res.send(reservation);
    })
    .catch((err) => res.send(null));
});


// Update reservation with personal information.
router.put("/:reservationId", (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation)
        return res.status(404).send({ err: "Reservation not found" });
      Hall.findOneByInfo(
        reservation.title,
        reservation.date,
        reservation.time
      ).then((hall) => {
        reservation.seats.forEach(function (seatID) {
          hall.occupied.set(seatID, true);
        });
        hall.save();
      });
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
          //Delete reservation obj
          request("http://localhost:80/graphql", deleteReservation, {
            id: req.params.reservationId,
          })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        })
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
