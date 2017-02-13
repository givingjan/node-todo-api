const dbPath = 'mongodb://localhost:27017/TodoApp';
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbPath);

module.exports = {
  mongoose : mongoose
}
