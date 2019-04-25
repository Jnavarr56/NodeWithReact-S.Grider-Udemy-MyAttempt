// Our authentication library.
const passport = require('passport');
// Our our strategy for use with Passort.
// - Make sure to do this:
// - npm install passport-google-oauth20@2 --save
// - npm install --save cookie-session
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// We are putting our API credentials here and ignoring in .gitignore.
const keys = require('../config/keys');

const User = mongoose.model('users'); //*** <- HOW TO INCLUDE USERS MODEL FROM MONGOOSE


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Configuring Passport to use the GoogleStrategy.
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,         //<- From our keys.js file
            clientSecret: keys.googleClientSecret, //<- From our keys.js file
            callbackURL: '/auth/google/callback',   //<- When user complies at consent screen, 
                                                   //   go to this path and include extra code 
                                                   //   as a string query parameter.

            proxy: true
        }, 

        // FINAL OAUTH CALLBACK (A)
        // When Google responds with user data after we have
        // performed our second request



        
        (accessToken, refreshToken, profile, done) => {

            // Quering the MongoDB is Asynchronous
            User.findOne({ googleID: profile.id }).then(existingUser => {
                    if (existingUser) {
                        
                        console.log("ALREADY HAVE USER");

                        console.log(done);

                        // Must call the done function w/ parameters to signal to passport to resume auth process.
                        done(null, existingUser);

                    } else {
                        // does not have user, so make one
                        new User({ googleID: profile.id }).save()
                            .then(user => done(null, user));
                    }
                });

            //if () {}


        }
    )
);