// import modules to app js file
const express = require("express");
require("dotenv").config();
const path = require("path");
const sessions = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(sessions);
const flash = require("express-flash");
require("express-async-errors");
const apiError = require("./helps/apiError");
const http = require("http");
const reload = require("reload");

// create app
const app = express();

// trigger middlewares
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "views")));
app.use("/", express.static(path.join(__dirname, "node_modules")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

var store = new MongoDBStore({
  // uri: "mongodb://localhost:27017",
  uri: "mongodb+srv://user:user123456@cluster0.9bx13jc.mongodb.net/?retryWrites=true&w=majority",
  collection: "sessions",
});

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(flash());

// routes middlewares

app.use("/lang/:value", (req, res) => {
  const { value } = req.params;
  console.log(req.session.lang);
  req.session.lang = value;
  res.redirect("/");
});

const serivcesRoutes = require("./routes/serivce.route");
app.use("/serivces", serivcesRoutes);

const contactusRoutes = require("./routes/contacts.routes");
app.use("/contactus", contactusRoutes);

const homeRoute = require("./routes/home.routes");
app.use("/", homeRoute);

const server = http.createServer(app);
const port = process.env.PORT;
server.listen(port, () => console.log(`server working on port ${port}`));
reload(app);

// to handle rejections outside exxpress
// process.on("unhandledRejection", (err) => {
//   console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`);
//   server.close(() => {
//     console.log(`server is shutdown`);
//     process.exit(1);
//   });
// });
