const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone_number:{
    type: String
  },
  password:{
    type: String 
  },
  position:{
    type: String  
  },
  specialization:{
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);