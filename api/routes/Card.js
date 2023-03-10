var express = require("express");
const {Card} = require("../models/Card");
const { Column } = require("../models/Column");
const {requestCounter, total_tasks} = require('../metrics')
const {logger} = require('../logger')

var router = express.Router();

const childLogger = logger.child({ service: 'card-service'});


router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        requestCounter.inc({'route': '/card', 'status_code': 200, 'requestType':'get'})
        res.status(200).json(cards);
    } catch (err) {
        requestCounter.inc({'route': '/card', 'status_code': 400, 'requestType':'get'})
        res.status(404).json({ message: err });
    }

});

router.get("/:cardId", async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);
        requestCounter.inc({'route': '/card/id', 'status_code': 200, 'requestType':'get'})
        res.status(200).json(card);
    } catch (err) {
        requestCounter.inc({'route': '/card/id', 'status_code': 400, 'requestType':'get'})
        res.status(404).json({ message: err });
    }

});

router.post("/", async (req, res) => {
    try {
        const { name, description, assignee, columnId  } = req.body;
        const columnn = await Column.findById(columnId);
        childLogger.info('Creating a new task', { request_id: req.requestId, ip_adress: req.ip});
        if (!description || !name){
            childLogger.error('Name and descripton are required', { request_id: req.requestId, ip_adress: req.ip});
        }
        const card = new Card({
            name: name,
            description: description,
            assignee: assignee,
            status: columnn.name
        });
        const savedCard = await card.save();

        
        const column = await Column.findByIdAndUpdate({_id: columnId}, {
            $push: {
                cards: savedCard,
            },
        })
        requestCounter.inc({'route': '/card', 'status_code': 200, 'requestType':'post'})
        total_tasks.inc();
        res.send(savedCard);
    } catch (err) {
        requestCounter.inc({'route': '/card', 'status_code': 400, 'requestType':'post'})
        res.status(404).json({ message: err });
    }
});

router.put("/", async(req, res) => {
    const { cardId, name, description, assignee  } = req.body;
    childLogger.info('updating a task', { request_id: req.requestId, ip_adress: req.ip});
    try {
        const card = await Card.updateOne({ _id: cardId },
            {
                name: name,
                description: description,
                assignee: assignee,
            }
        );
        requestCounter.inc({'route': '/card', 'status_code': 200, 'requestType':'put'})
        res.status(200).json(card);
    } catch (e) {
        requestCounter.inc({'route': '/card', 'status_code': 400, 'requestType':'put'})
        res.send(e);
    }
});

router.delete("/:cardId", async(req, res) => {
    try {
        const removedCard = await Card.remove({ _id: req.params.cardId });
        requestCounter.inc({'route': '/card', 'status_code': 200, 'requestType':'delete'})
        total_tasks.dec();
        res.status(200).json(removedCard);
    } catch (err) {
        requestCounter.inc({'route': '/card', 'status_code': 400, 'requestType':'delete'})
        res.status(404).json({ message: err });
    }
});
module.exports = router;