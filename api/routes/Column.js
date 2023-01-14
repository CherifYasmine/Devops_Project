var express = require("express");
const {Column} = require("../models/Column");
const {requestCounter} = require('../metrics')

var router = express.Router();

router.get("/", async (req, res) => {
    try {
        const columns = await Column.find();
        requestCounter.inc({'route': '/column', 'status_code': 200, 'requestType':'get'})
        res.status(200).json(columns);
    } catch (err) {
        requestCounter.inc({'route': '/column', 'status_code': 400, 'requestType':'get'})
        res.status(404).json({ message: err });
    }

});
router.post("/", async (req, res) => {
    try {
        const { name  } = req.body;

        const column = new Column({
            name: name,
        });
        const savedColumn = await column.save();
        requestCounter.inc({'route': '/column', 'status_code': 200, 'requestType':'post'})
        res.send(savedColumn);
    } catch (err) {
        requestCounter.inc({'route': '/column', 'status_code': 200, 'requestType':'post'})
        res.status(404).json({ message: err });
    }
});

router.get("/:columnId", async (req, res) => {
    try {
        const column = await Column.findById(req.params.columnId);
        requestCounter.inc({'route': '/column/id', 'status_code': 200, 'requestType':'get'})
        res.status(200).json(column);
    } catch (err) {
        requestCounter.inc({'route': '/column/id', 'status_code': 400, 'requestType':'get'})
        res.status(404).json({ message: err });
    }

});

router.put("/", async(req, res) => {
    const { columnId, name} = req.body;
    const column = await Column.findOne({ _id: columnId});
    try {
        const updated = await Column.updateOne({ _id: columnId },
            {
                name: name,
                cards: column.cards,
                _id: columnId
            }
        );
        requestCounter.inc({'route': '/column', 'status_code': 200, 'requestType':'put'})
        res.status(200).json(updated);
    } catch (e) {
        requestCounter.inc({'route': '/column', 'status_code': 400, 'requestType':'put'})
        res.send(e);
    }
});

router.delete("/:columnId", async(req, res) => {
    try {
        const removedCol = await Column.remove({ _id: req.params.columnId });
        requestCounter.inc({'route': '/column', 'status_code': 200, 'requestType':'delete'})
        res.status(200).json(removedCol);
    } catch (err) {
        requestCounter.inc({'route': '/column', 'status_code': 400, 'requestType':'delete'})
        res.status(404).json({ message: err });
    }
});
module.exports = router;