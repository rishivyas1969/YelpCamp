var express = require("express") ;
var router = express.Router() ;
var passport = require("passport") ;
var User = require("../models/user") ;
var Comment = require("../models/comment") ;

router.get("/", function(req, res){
    res.render("landing") ;
}) ;


// ======== AUTH ROUTES======

// ===== REGISTER ROUTES ====
router.get("/register", function(req, res){
    res.render("register") ;
}) ;

router.post("/register", function(req, res){
    var newUser = new User({ username: req.body.username}) ;
    User.register( newUser, req.body.password, function(err, user){
        if(err){
            console.log(err.name); 
            req.flash("error", err.message) ;
            return res.redirect("/register") ;
        }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Hi! " + user.username + ", How you doing..?") ;
                res.redirect("/campgrounds") ;
            });
    }) ;
}) ;

// ====== LOGIN ROUTES =====

router.get("/login", function(req, res) {
    res.render("login") ;
}) ;

// app.post("/login", MiddlWare, CallBack) ;
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    req.flash("login", "Successfully Logged In!") ;
})  ;

// ===== LOGOUT ROUTES ====
router.get("/logout", function(req, res){
    req.logOut() ;
    req.flash("success", "Thrown you Out!") ;
    res.redirect("/campgrounds") ;
});

// ======= IS LOGGED IN =====
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next() ;
    }
    res.redirect("/login") ;
};

module.exports = router ;