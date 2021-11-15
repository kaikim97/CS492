const router = require('express').Router();
const Hall = require('../models/hall');

// Find all
router.get('/', (req, res) =>{
    Hall.findAll()
        .then((halls) => {
            res.send(halls);
        })
        .catch(err => res.status(500).send(err));
});

// Find one by time
router.get('/:time', (req,res) => {
    Hall.findOneByTime(req.params.time)
    .then((hall) => {
        if (!hall) return res.status(404).send({
            err: 'Hall not found'
        });
        res.send(hall);
    })
    .catch(err=> res.status(500).send(err));
} );

// Create new hall
router.post('/', (req, res) => {
    Hall.create(req.body)
        .then(hall => res.send(hall))
        .catch(err => res.status(500).send(err));
});

// Delete hall
router.delete('/:time', (req,res) => {
    Hall.deleteByTime(req.params.time)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;