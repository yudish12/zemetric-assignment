const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const { sequelizeClient } = require("./utils/db");
const User = require("./models/User");
const Sms = require("./models/Sms");

sequelizeClient
  .authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

sequelizeClient.sync().then(() => {
  console.log("Database & tables synced!");
});

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/api", require("./routes/auth"));
app.use("/api/sms", require("./routes/sms"));

// errors
app.all("*", (req, res, next) => {
  //AppError class for error handler object
  next(new AppError(`Cannot find route ${req.originalUrl} in the server`));
});

//error middle ware whenever first arg is err object it is error middleware
app.use(globalErrorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! ");
  server.close(() => {
    process.exit(1);
  });
});
