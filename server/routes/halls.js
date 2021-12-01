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

// Find one by (title, date, time)
router.get('/hall', (req,res) => {
    let title = req.query.title;
    let date = req.query.date;
    let time = req.query.time;
    Hall.findOneByInfo(title, date, time)
    .then((hall) => {
        if (!hall) return res.status(404).send({
            err: 'Hall not found'
        });
        res.send(hall);
    })
    .catch(err=> res.status(500).send(err));
} );

// Get array of (time, available) by (title, date)
router.get('/available', (req,res) => {
    let title = req.query.title;
    let date = req.query.date;

    Hall.findAvailable(title, date)
    .then((halls) => {
        if (!halls) return res.status(404).send({
            err: 'Hall not found'
        });
        res.send(halls);
        console.log(halls.length)
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
router.delete('/hall', (req,res) => {
    let title = req.query.title;
    let date = req.query.date;
    let time = req.query.time;
    Hall.deleteByInfo(title, date, time)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;