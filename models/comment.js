var mongoose = require("mongoose") ;

var CommetnSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}) ;

module.exports = mongoose.model("Comment", CommetnSchema) ;