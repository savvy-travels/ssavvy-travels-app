require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = process.env;
const userCtrl = require("./controllers/user");
const locationCtrl = require("./controllers/location");
const prefAirportCtrl = require("./controllers/preferredAirport");
const airportCtrl = require("./controllers/airports");
const listCtrl = require("./controllers/airportList");
const authMiddleware = require("./middleware/verifyUser");
const nodemailer = require("nodemailer");
const activateCtrl = require("./controllers/activate");

const app = express();
app.use(express.json());
const path = require("path");
const api = require("./controllers/api");

app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.post("/api/location", api.location);
app.get("/api/city/:latLong", api.city);
app.get("/api/landing/airport/:city", api.airport);
app.get(
  "/api/skyscanner/:airport/:from/:depart_date/:return_date",
  api.skyScanner
);

app.get(`/api/auth/verification/:id/:token`, activateCtrl.verify);

app.post("/api/auth/register", userCtrl.register);
app.post("/api/auth/login", userCtrl.login);
app.post("/api/auth/logout", userCtrl.logout);
app.get("/api/auth/user", authMiddleware.isAuthenticated, userCtrl.getUser);

app.get("/api/airports/:city", listCtrl.getLocalAirports);
app.get("/api/airports", listCtrl.getAllAirports);

app.post(
  "/api/saveLocation",
  authMiddleware.isAuthenticated,
  locationCtrl.saveLocation
);
app.get(
  "/api/locations",
  authMiddleware.isAuthenticated,
  locationCtrl.getLocation
);

app.post(
  "/api/updatePreferred",
  authMiddleware.isAuthenticated,
  prefAirportCtrl.updatePreferred
);
app.get(
  "/api/getPreferred",
  authMiddleware.isAuthenticated,
  prefAirportCtrl.getPreferred
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  app.set("transporter", transporter);
  console.log("DB Ready");
  app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
