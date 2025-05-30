const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username:   { type: String, required: true, unique: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    points:     { type: Number, default: 0 },
    lastPostDate: { type: Date, default: null },    
    streak:     { type: Number, default: 0 },
    createdAt:  { type: Date, default: Date.now },
    postCount:      { type: Number, default: 0 }
})


const User = mongoose.model("User",UserSchema);

module.exports=User;