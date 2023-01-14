var mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Card",
    }
})

const Column = mongoose.model("Column", columnSchema);

exports.Column = Column;
