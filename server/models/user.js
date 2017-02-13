var mongoose = require('mongoose');


// User
var User = mongoose.model('Users',{
  email : {
    type : String,
    required : true,
    trim : true,
    minlength : 1,
  }
});

module.exports = {
  User : User
}
