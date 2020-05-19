var mongoose = require("mongoose") ;
var Campground = require("./models/campground") ;
var Comment = require("./models/comment") ;

var data = [
    {
        name: "Audi R8",
        image: "https://inventory-dmg.assets-cdk.com/9/0/1/20834037109.jpg",
        description: "Yeah it is my favorite Car.."
    },
    {
        name: "Ford Mustang",
        image: "https://i.insider.com/56abc10dc08a801b008bdd5c?width=1100&format=jpeg&auto=webp",
        description: "It is Mustang..it is my fucking favorite.."
    },
    {
        name: "Lamborghini Centinario",
        image: "https://i.ytimg.com/vi/ILFMzAmRClI/maxresdefault.jpg",
        description: "Its back is awesome.."
    }];

function seedDB() {
    Campground.remove({} , function(err, campground){
        if(err) {
            console.log("ERROR" + err) ;
        }
        else {
            console.log("All data Removed!!") ;
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err) {
                        console.log(err) ;
                    }
                    else{
                        console.log("Data Added!!")  ;
                        Comment.create({
                            text: "Wow,, it is a nice car..",
                            author: "Nigga"
                        }, function(err, comment){
                            if(err) {
                                console.log(err) ;
                            }
                            else
                            {
                                campground.comments.push(comment) ;
                                campground.save() ;
                                console.log("Comment Created!!") ;
                            }
                        });
                    }
                }) ;
            }) ;
            
        }
    }) ;    
} ;

module.exports = seedDB ;

