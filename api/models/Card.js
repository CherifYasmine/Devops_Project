var mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignee: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

const Card = mongoose.model("Card", cardSchema);

exports.Card = Card;

