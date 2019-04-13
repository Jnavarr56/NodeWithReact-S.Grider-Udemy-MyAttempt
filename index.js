// Our framework/middleware.
const express = require('express');
// Our authentication library.
const passport = require('passport');
// Our our strategy for use with Passort.
// - Make sure to do this:
// - npm install passport-google-oauth20@2 --save
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// We are putting our API credentials here and ignoring in .gitignore.
const keys = require('./config/keys');
// This object handles routes, as seen below.
const app = express();

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

// This handles the initial request we forward to Google
// and specifies scope of the data we are asking for.
// PERFORMS FIRST OAUTH REQUEST
app.get(
    '/auth/google/', 
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// RESPONSE TO FIRST REQUEST
// This handles the path we are sent to after the user complies at the consent screen.
// passport.authenticate('google') will take in the code included by Google tacked
// on to the end of this path by performing another request to Google using this code.
// SEE (A)
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);   