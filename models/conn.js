const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

exports.connect = async () => {
  return (
    mongoose
      // .connect("mongodb://127.0.0.1:27017/proEntertianment")
      .connect(
        "mongodb+srv://user:user123456@cluster0.9bx13jc.mongodb.net/proEntertianment?retryWrites=true&w=majority"
      )
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
  return (
    mongoose
      // .connect("mongodb://127.0.0.1:27017/rolandGroup")
      .connect(
        "mongodb+srv://user:user123456@cluster0.9bx13jc.mongodb.net/?retryWrites=true&w=majority"
      )
      .then((res) => {
        console.log("welcome mongodb connection cloud ");
      })
      .catch((err) => {
        console.log("dataabase error");
        console.log(err);
      })
  );
};
