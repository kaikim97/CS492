const router = require('express').Router();
const Reservation = require('../models/reservation');
const Hall = require('../models/hall');

// Find All
router.get('/', (req, res) => {
  Reservation.findAll()
    .then((reservations) => {
      res.send(reservations);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by Id
router.get('/:reservationId', (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) return res.status(404).send({ err: 'Reservation not found' });
      res.send(reservation);
    })
    .catch(err => res.status(500).send(err));
});

// Create new reservation
router.post('/', (req, res) => {
  Hall.findOneByTime(req.body.time)
  .then((hall) => {
      if (!hall) return res.status(404).send({
          err: 'Hall not found'
      });
      else if (hall.available < req.body.seats) return res.status(404).send({
          err: "Not enough seats"
      });
      hall.available = hall.available - req.body.seats;
      hall.save();
      return Reservation.create(req.body);
  })
  .then(reservation => {
    res.send(reservation)
  })
  .catch(err => res.status(500).send(err));  
});

// Delete reservation by ID
router.delete('/:reservationId', (req, res) => {
  Reservation.findOneById(req.params.reservationId)
  .then((reservation) => {
      Hall.findOneByTime(reservation.time)
      .then((hall) => {
        hall.available = hall.available + reservation.seats;
        hall.save();
        return Reservation.deleteById(req.params.reservationId) 
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
  })
  .catch(err=> res.status(500).send(err));
});

module.exports = router;