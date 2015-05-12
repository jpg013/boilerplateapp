mongoose = require("mongoose");

var connection = null;
exports.connect = function() {
  if (!process.env.MONGO) {
    console.log("Mongo not connected, no $MONGO environment setting found.")
  }
  else if (!connection) {
    connection = mongoose.connect(process.env.MONGO)
  }
  return connection;
}
