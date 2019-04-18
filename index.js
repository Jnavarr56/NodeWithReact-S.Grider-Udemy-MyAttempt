// NOTE: 
/* 
    FOR THINGS THAT NEED MONGOOSE MODEL CLASSES, WE DO NOT REQUIRE THE CLASS IN.
    WE INCLUDE IT IN A DIFFERENT WAY.
    
*/

// Our framework/middleware.
const express = require('express');
// Let's use connect to MongoDB
const mongoose = require('mongoose');
// Our API stuff, credentials...
const keys = require('./config/keys');

// These just make sure that these files execute here.
require('./services/passport');
require('./models/User');


// Connecting mongoose to remote DB.
mongoose.connect(keys.mongoURI);

// Our route handler/framework object.
const app = express();
require('./routes/authRoutes')(app); // <-- This works because page is exported as function.
 

const PORT = process.env.PORT || 5000;
app.listen(PORT);   