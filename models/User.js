const mongoose = require('mongoose');
// const Schema = monogoose.Schema;
// The commented line above is equivalent to the line below:
const { Schema } = mongoose;

// Using mongoose eliminates ability to have different fields on each model instance.
// Mongoose requires schema.

// Schema
const userSchema = new Schema({
    // Field Name: Type 
    googleID: String
    
});

// Model     model name, model schema
mongoose.model('users', userSchema);

