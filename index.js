const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/book");
const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(bodyParser.json());
require("express-async-errors");
require("dotenv").config();
require("./db");

app.use("/user", userRouter);
app.use("/books", authMiddleware, bookRouter);
app.use("/", homeRouter);

app.use((error, req, res, next) => {
  console.log("some error occured, bikash", error);
  process.exit(1);
});
app.listen(process.env.EXPRESS_PORT, () => {
  console.log("server started");
});
