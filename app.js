// import modules to app js file
const express = require("express");
require("dotenv").config();
const path = require("path");
const sessions = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(sessions);
const flash = require("express-flash");
require("express-async-errors");
const apiError = require("./helps/apiError");
// const http = require("http");
// const reload = require("reload");

// create app
const app = express();

// trigger middlewares
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "views")));
app.use("/", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

var store = new MongoDBStore({
  // uri: "mongodb://localhost:27017",
  uri: "mongodb+srv://user:user123456@cluster0.9bx13jc.mongodb.net/proEntertianment?retryWrites=true&w=majority",
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

app.use((req, res, next) => {
  req.session.lang = req.session.lang || "eng";
  next();
});

app.use("/lang/:value", (req, res) => {
  const { value } = req.params;
  console.log(req.session.lang);
  req.session.lang = value;
  res.redirect("/");
});

const homeRoute = require("./routes/home.routes");
app.use("/", homeRoute);

const serivcesRoutes = require("./routes/serivce.route");
app.use("/serivces", serivcesRoutes);

const newsRoutes = require("./routes/news.routes");
app.use("/news", newsRoutes);

const eventsRoutes = require("./routes/events.routes");
app.use("/events", eventsRoutes);

const aboutRoutes = require("./routes/about.routes");
app.use("/about", aboutRoutes);

const referancesRoutes = require("./routes/referances.routes");
app.use("/referances", referancesRoutes);

const contactusRoutes = require("./routes/contacts.routes");
app.use("/contactus", contactusRoutes);

// const server = http.createServer(app);
const port = process.env.PORT;
app.listen(port, () => console.log(`server working on port ${port}`));
// reload(app);
