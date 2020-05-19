var Campground = require("../models/campground") ;
var Comment = require("../models/comment") ;
var mallwareObject = {} ;

mallwareObject.checkCommentOwernership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong!") ;
                res.redirect("back") ;
            }
            else{
                if(comment.author.id.equals(req.user._id)){
                    next() ;
                }
                else
                {
                    req.flash("error", "You have no Permission to do that!") ;
                    res.redirect("back") ;
                }
            }
        }) ;
    }
    else{
        req.flash("error", "You have to LogIn!") ;
        res.redirect("back") ;
    }
}

// ===== checkCampgroundOwernership ===
mallwareObject.checkCampgroundOwernership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error", "Error: Campground not found!") ;
                res.redirect("back") ;
            }
            else{
                if(campground.author.id.equals(req.user._id)){
                    next() ;
                }
                else
                {
                    req.flash("error", "You have no Permission!") ;
                    res.redirect("back") ;
                }
            }
        }) ;
    }
    else{
        req.flash("error", "You have to LogIn!") ;
        res.redirect("back") ;
    }
}

// ======= IS LOGGED IN =====
mallwareObject.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next() ;
    }
    req.flash("error", "You have to LogIn!") ;
    res.redirect("/login") ;
};

module.exports = mallwareObject ;