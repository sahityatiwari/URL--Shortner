const mongoose  = require("mongoose");
const urlSchema = new mongoose.Schema({
     
   shortId : {
    type : String,
    required : true,
    Unique : true,
   },
   redirectURL : {
    type : String,
    required : true,
   },
   visitHistory : [{timestamp : Number}],
},
   {timestamps : true},
);


const URL = mongoose.model("user", urlSchema);
module.exports = URL;
