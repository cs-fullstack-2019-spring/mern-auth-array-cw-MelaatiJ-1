var express = require('express');
var router = express.Router();
var UserCollection = require("../models/UserSchema");

//hash passwords
var bCrypt = require('bcrypt-nodejs');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// initialize passport and restore cookie data
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
    done(err, user);
  });
});


var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
//
// router.get("/", (request, response) => {
//     if(request.session.username) {
//         response.send(request.session.username);
//     }
//     else
//     {
//         response.send(null)
//     }
// });
//
// router.get("/logout", (request, response) => {
//     if(request.session) {
//         request.session=null
//     }
//     else
//     {
//         response.send("Not Logged In!")
//     }
// });

router.post("/",
    passport.authenticate("signup", {failureRedirect:"/users/failNewUser"})

    )

router.get("failNewUser", (request, response) => {
    response.send("NOPE!! ")
});

// checking if a user exist
passport.use(new LocalStrategy(
    function(username, pasword, done) {
        UserCollection.findOne({username:username}, (error, user) => {
            if(errors)
            {
                return done(error)
            }
            if(!user)
            {
                return done(null, false, {message:"incorrect Username"})
            }
            if(!isValidPassword(user, password)) {
                return done(null, false, { message:"incorrect password. "});
            }
            return done(null, user, { user:user.username});
        })
    }
));
router.post("/login",
    passport.authenticate("local", {
        failureRedirect:"/users/loginfail"
    }),

    function(request, response){
        request.session.username = request.user.username;
        response.send({
            username:request.user.username,
            email:request.user.email
        });


    });

router.get("/loginfsil", (request, response) => {
    response.send({})
});

router.get("/logout", (request, response) => {
    request.session = null
});




module.exports = router;