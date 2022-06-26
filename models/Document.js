const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        createdAt: {
            imutable: true, //cannot be changed
            type: Date,
            default: () => Date.now() //saves date everytime a user is added
        }
    }
})

module.exports = mongoose.model("Document", documentSchema);