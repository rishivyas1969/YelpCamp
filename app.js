var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    flash                   = require("connect-flash"),
    methodOverride          = require("method-override"),
    mongoose                = require("mongoose") ;

var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User    = require("./models/user"),
    seedDB = require("./seed") ;

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index") ;

// mongoose connect
mongoose.connect("mongodb://localhost/YelpCamp_v10", {useNewUrlParser: true, useUnifiedTopology: true}) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.set("view engine", "ejs") ;
app.use(express.static(__dirname + "/public")) ;
app.use(methodOverride("_method")) ;

app.use(require("express-session")({
    secret: "This is Secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(flash()) ;
app.use(passport.initialize()) ;
app.use(passport.session()) ;

passport.use(new LocalStrategy(User.authenticate())) ;
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;


//seedDB() ;
app.use( function(req, res, next){
    res.locals.currentUser = req.user ;
    res.locals.error_message = req.flash("error") ;
    res.locals.success_message = req.flash("success") ;
    res.locals.login_message = req.flash("login") ;
    next() ;
}); 

app.use(indexRoutes) ;
app.use("/campgrounds", campgroundRoutes) ;
app.use("/campgrounds/:id/comments", commentRoutes) ;

app.listen(3000, function(){
    console.log("YelpCamp Server started!") ;
}) ;