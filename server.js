const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.json());

/*  ---------------------------------------------  */
/*                      Mongo DB                   */
/*  ---------------------------------------------  */
const DATABASE_URL = "mongodb://0.0.0.0:27017/demo";

const mongoose = require("mongoose");
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => {
  console.log("Connected Mongo");
});

const userDataModel = require("./model/user");
app.get("/", (req, res) => {
  // add user
  new userDataModel({
    name: 420,
    age: "12",
    access: "true",
  })
    .save()
    .then((data) => {
      console.log(data);
    });
  res.send("Done!!!");
});

app.get("/find", (req, res) => {
  // find user
  userDataModel
    .find({
      name: 420,
      access: true,
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

app.get("/update", (req, res) => {
  // update user
  userDataModel
    .updateOne(
      {
        name: 420,
        access: true,
      },
      {
        access: false,
        age: 87687,
      }
    )
    .exec()
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

app.listen(4000, () => {
  console.log("Started");
});
