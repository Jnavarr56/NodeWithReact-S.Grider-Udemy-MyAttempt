// Our authentication library.
const passport = require('passport');
// Our our strategy for use with Passort.
// - Make sure to do this:
// - npm install passport-google-oauth20@2 --save
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// We are putting our API credentials here and ignoring in .gitignore.
const keys = require('../config/keys');

// Configuring Passport to use the GoogleStrategy.
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,         //<- From our keys.js file
            clientSecret: keys.googleClientSecret, //<- From our keys.js file
            callbackURL: '/auth/google/callback'   //<- When user complies at consent screen, 
                                                   //   go to this path and include extra code 
                                                   //   as a string query parameter.
        }, 

        // FINAL OAUTH CALLBACK (A)
        // When Google responds with user data after we have
        // performed our second request
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            console.log(done);
        }
    )
);