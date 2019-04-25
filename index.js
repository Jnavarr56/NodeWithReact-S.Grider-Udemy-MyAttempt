// NOTE: 
/* 
    FOR THINGS THAT NEED MONGOOSE MODEL CLASSES, WE DO NOT REQUIRE THE CLASS IN.
    (for instance, we need to use our user model in the passport.js callback)
    WE INCLUDE IT IN A DIFFERENT WAY.

    ONCE WE "LOAD" THE USERS MODEL IN USERS.JS IT IS ACCESSIBLE
    IN PASSPORT.JS WITH mongoose.model('users');


*/

// Our framework/middleware.
const express = require('express');
// Let's use connect to MongoDB
const mongoose = require('mongoose');
// Our API stuff, credentials...
const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport');


// These just make sure that these files execute here.
require('./models/User'); //<-- This first bc it loads in the Schema for the Users model that is used in passport.js
require('./services/passport');

// Connecting mongoose to remote DB.
mongoose.connect(keys.mongoURI);

// Our route handler/framework object.
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // <-- This works because page is exported as function.
 

const PORT = process.env.PORT || 5000;
app.listen(PORT);   