const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const Availablecars = new mongoose.model("Availablecars",new Schema({_id:mongoose.Types.ObjectId ,Name: String, availabity: Boolean}),"availablecars");

module.exports = Availablecars;