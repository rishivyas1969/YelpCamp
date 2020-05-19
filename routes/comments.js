var express = require("express") ;
var router = express.Router({mergeParams: true}) ;
var Campground = require("../models/campground") ;
var Comment = require("../models/comment") ;
var mallware    = require("../mallware") ;

// ======== COMMENTS ROUTES ======
// ====== SHOW ADD COMMENT PAGE ===
router.get("/new", mallware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("comments/new", {campground: campground, current_user: req.user}) ;
    })
    
}) ;

// ====== COMMENT ADD LOGIC ===
router.post("/", mallware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err) ;
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err) ;
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id ;
                    comment.author.username = req.user.username ;
                    //save comment
                    comment.save() ;
                    campground.comments.push(comment) ;
                    campground.save() ;
                    res.redirect("/campgrounds/" + campground._id) ;
                }
            }) ;
        }
    });
}) ;

// ==== COMMENT EDIT PAGE ===
router.get("/:comment_id/edit", mallware.checkCommentOwernership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err) ;
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment}) ;
        }
    });
}) ;

// ==== COMMENT UPDATE LOGIC ===
router.put("/:comment_id", mallware.checkCommentOwernership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, comment){
        if(err){
            console.log(err) ;
        }
        else{
            res.redirect("/campgrounds/" + req.params.id) ;
        }
    }) ;
}) ;

//==== DELETE COMMENT ====
router.delete("/:comment_id", mallware.checkCommentOwernership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err) ;
        }
        else{
            res.redirect("/campgrounds/" + req.params.id) ;
        }
    })
}) ;




module.exports = router ;