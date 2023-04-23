const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

var username = "user";
var password = "user123456";
var hosts = "fw-c9-1.objectrocket.com:12345,dfw-c9-0.objectrocket.com:12345";
var database = "proEnterainment";
var options = "?replicaSet=c74b5276378ed3bd70cba37a3ac45fea";
var connectionString =
  "mongodb://" +
  username +
  ":" +
  password +
  "@" +
  hosts +
  "/" +
  database +
  options;

console.log(connectionString);

exports.connect = async () => {
  return (
    mongoose
      .connect(
        "mongodb+srv://user:user123456@cluster0.9bx13jc.mongodb.net/?retryWrites=true&w=majority"
      )
      // .connect("mongodb://localhost:27017/proEntertianment")
      .then((res) => {
        console.log("welcome mongodb connection");
      })
      .catch((err) => {
        console.log("dataabase error");
        console.log(err);
      })
  );
};

exports.connectOther = async () => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/rolandGroup")
    .then((res) => {
      console.log("welcome mongodb connection");
    })
    .catch((err) => {
      console.log("dataabase error");
      console.log(err);
    });
};
