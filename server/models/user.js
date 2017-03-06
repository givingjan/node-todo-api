const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
    trim : true,
    minlength : 1,
    unique : true,
    validate : {
      // validator : (value) => {
      //   return validator.isEmail(value);
      // },
      validator : validator.isEmail,
      message : '{VALUE} is not a valid email.'
    },
  },
  password : {
      type : String,
      require : true,
      minlength : 6
  },
  tokens : [{
      access : {
        type : String,
        required : true
      },
      token : {
        type : String,
        required : true
      }
    }]
});
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
}
// not support for arrow function
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString(),access},'abc123').toString();

  console.log('token :',token);
  user.tokens.push({
    access, token
  });

  return user.save().then(() => {
    return token;
  });
}
var User = mongoose.model('User',UserSchema)
// // User
// var User = mongoose.model('Users',{
//   email : {
//     type : String,
//     required : true,
//     trim : true,
//     minlength : 1,
//     unique : true,
//     validate : {
//       // validator : (value) => {
//       //   return validator.isEmail(value);
//       // },
//       validator : validator.isEmail,
//       message : '{VALUE} is not a valid email.'
//     },
//   },
//   password : {
//       type : String,
//       require : true,
//       minlength : 6
//   },
//   tokens : [{
//       access : {
//         type : String,
//         required : true
//       },
//       token : {
//         type : String,
//         required : true
//       }
//     }]
//
// });
//
module.exports = {
  User : User
}
