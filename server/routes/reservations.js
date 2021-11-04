const router = require('express').Router();
const Reservation = require('../models/reservation');

// Find All
router.get('/', (req, res) => {
  Reservation.findAll()
    .then((reservations) => {
      res.send(`find successfully: ${reservations}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by Id
router.get('/:reservationId', (req, res) => {
  Reservation.findOneById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) return res.status(404).send({ err: 'Reservation not found' });
      res.send(`findOne successfully: ${reservation}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new reservation
router.post('/', (req, res) => {
  Reservation.create(req.body)
    .then(reservation => res.send(reservation))
    .catch(err => res.status(500).send(err));
});

// Delete reservation by ID
router.delete('/:reservationId', (req, res) => {
  Reservation.deleteById(req.params.reservationId)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;