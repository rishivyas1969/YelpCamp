var mongoose = require("mongoose") ;
// mongoose schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}) ;

//mongoose model
 module.exports = mongoose.model("Campground", campgroundSchema) ;