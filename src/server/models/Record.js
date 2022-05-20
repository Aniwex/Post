const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
   title: String,
   body:String,
}); 


module.exports = mongoose.model('Record', Record);

