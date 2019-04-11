const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

/*
app.get('/', (req, res) => {

    res.send({ testing: 'hey mang' });

});
*/

/*
REMEMBER UDEMY CORRECTION
http://localhost:5000/auth/google/callback
*/

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);   