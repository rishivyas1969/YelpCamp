var express = require("express") ;
var router = express.Router({mergeParams:true}) ;
var bodyParser = require("body-parser") ;
var Campground = require("../models/campground");
var mallware    = require("../mallware") ;

router.use(bodyParser.urlencoded({extended:true})) ;

// ===== SHOW HOME PAGE ====
router.get("/", function(req, res){
    
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("ERROR:") ;
            console.log(err) ;
        }
        else{
            res.render("campgrounds/index", {campgrounds:campgrounds}) ;
        }
    }) ;
});

// ===== ADDING CAMP LOGIC ===
router.post("/", mallware.isLoggedIn, function(req, res) {
    var name = req.body.name ;
    var image = req.body.image ;
    var description = req.body.description ;
    var author = {
                    id: req.user._id,
                    username: req.user.username
                } ;
    var newCamp = {name:name, image:image, description:description, author: author} ;
    Campground.create(newCamp, function(err, newlyAdded){
        if(err){
            console.log(err) ;
        }
        else{
            res.redirect("/campgrounds") ;
        }
    }) ;
}) ;

// ===== ADDING CAMP PAGE =====
router.get("/new", mallware.isLoggedIn, function(req, res){
    res.render("campgrounds/new") ;
});

// ====== SHOWING CAMP :id PAGE ====
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgound){
        if(err){
            console.log(err) ;
        }
        else{
            res.render("campgrounds/show",{campground: foundCampgound}) ;
        }
    }) ;
}) ;

// ==== UPDATE PAGE ===
router.get("/:id/edit", mallware.checkCampgroundOwernership, function(req, res){
        Campground.findById(req.params.id, function(err, campground){
            res.render("campgrounds/edit", {campground:campground}) ;
        }) ;
}) ;

// ==== UPDATE LOGIC ====
router.put("/:id", mallware.checkCampgroundOwernership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            res.redirect("campground") ;
        }
        else{
           res.redirect("/campgrounds/" + req.params.id) ;
        }
    });
}) ;

// ===== DELETE ROUTE ===
router.delete("/:id", mallware.checkCampgroundOwernership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds") ;
        }
        else
        {
            res.redirect("/campgrounds") ;
        }
    })  ;
});


module.exports = router ;