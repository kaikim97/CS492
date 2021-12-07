const router = require("express").Router();
const Hall = require("../models/hall");
const Reservation = require("../models/reservation");
const { gql, useMutation } = require("@apollo/client");
const { request } = require("graphql-request");

const createReservation = gql`
  mutation Mutation(
    $title: String
    $date: String
    $time: String
    $seats: [String]
  ) {
    createReservation(title: $title, date: $date, time: $time, seats: $seats) {
      _id
      title
      date
      time
      seats
    }
  }
`;

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

// Find all
router.get("/", (req, res) => {
  Hall.findAll()
    .then((halls) => {
      res.send(halls);
    })
    .catch((err) => res.status(500).send(err));
});

// Find one by time
router.get("/hall", (req, res) => {
  const title = req.query.title;
  const date = req.query.date;
  const time = req.query.time;
  Hall.findOneByInfo(title, date, time)
    .then((hall) => {
      if (!hall)
        return res.status(404).send({
          err: "Hall not found",
        });
      res.send(hall);
    })
    .catch((err) => res.status(500).send(err));
});

// Get array of (time, available) by (title, date)
router.get("/available", (req, res) => {
  const title = req.query.title;
  const date = req.query.date;

  Hall.findAvailable(title, date)
    .then((halls) => {
      if (!halls)
        return res.status(404).send({
          err: "Hall not found",
        });
      res.send(halls);
      console.log(halls.length);
    })
    .catch((err) => res.status(500).send(err));
});

// Preoccupy a seat
router.post("/preoccupy", (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const seats = req.body.seats;
  let rv_id;

  Hall.findOneByInfo(title, date, time)
    .then((hall) => {
      if (!hall)
        return res.status(404).send({
          err: "Hall not found",
        });
      //Check if any of the selected seats are preoccupied or reserved.
      seats.forEach(function (seatID) {
        if (hall.occupied.has(seatID)) {
          return res.status(404).send({ err: "Preoccupied or reserved seat" });
        }
      });
      //Create reservation object and append to occupied map.

      request("http://localhost:80/graphql", createReservation, {
        title: title,
        date: date,
        time: time,
        seats: seats,
      })
        .then((reservation) => {
          console.log(reservation.createReservation._id);
          rv_id = reservation.createReservation._id;
          hall.available = hall.available - req.body.seats.length;
          req.body.seats.forEach(function (seatID) {
            hall.occupied.set(seatID, false);
          });
          hall
            .save()
            .then((savedHall) => {
              res.send(reservation.createReservation);
            })
            .catch((err) => {
              res.status(500).send({ err: "failed to save hall" });
            });
          //  res.send(reservation);*/
        })
        .catch((err) => {
          res.status(500).send({ err: "failed to create reservation" });
        });

      //Cancel preoccupancy if the seats are not reserved within 5 min.

      setTimeout(async function () {
        Reservation.findOneById(rv_id)
          .then((rv) => {
            if (!rv)
              return res.status(404).send({ err: "Reservation not found" });
            if (rv.birth === "") {
              hall.available = hall.available + req.body.seats.length;
              req.body.seats.forEach(function (seatID) {
                hall.occupied.delete(seatID);
              });
              hall.save();
              //Delete reservation obj
              request("http://localhost:80/graphql", deleteReservation, {
                id: rv_id,
              })
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }, 30 * 1000);
    })
    .catch((err) => {
      res.status(500).send({ err: "failed to find hall" });
    });
});

// [DB management]

// Get array of (time, available) by (title, date)
router.get("/available", (req, res) => {
  let title = req.query.title;
  let date = req.query.date;

  Hall.findAvailable(title, date)
    .then((halls) => {
      if (!halls)
        return res.status(404).send({
          err: "Hall not found",
        });
      res.send(halls);
      console.log(halls.length);
    })
    .catch((err) => res.status(500).send(err));
});

// Create new hall
router.post("/", (req, res) => {
  Hall.create(req.body)
    .then((hall) => res.send(hall))
    .catch((err) => res.status(500).send(err));
});

// Delete hall
router.delete("/hall", (req, res) => {
  const title = req.query.title;
  const date = req.query.date;
  const time = req.query.time;
  Hall.deleteByInfo(title, date, time)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

// Clear occupied map of the hall object for (title, date, time).
router.get("/clear", (req, res) => {
  const title = req.query.title;
  const date = req.query.date;
  const time = req.query.time;
  Hall.findOneByInfo(title, date, time)
    .then((hall) => {
      if (!hall)
        return res.status(404).send({
          err: "Hall not found",
        });
      hall.occupied.clear();
      res.send(hall);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
