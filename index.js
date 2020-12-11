const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/book");
const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(bodyParser.json());
require("dotenv").config();
require("./db");

app.use("/user", userRouter);
app.use("/books", authMiddleware, bookRouter);
app.use("/post", authMiddleware, postRouter);
app.use("/", homeRouter);

app.use((error, req, res, next) => {
  console.log("some error occured, bikash", error.message);
  res.status(500).json({ error: 1, message: error.message });
});
app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});

process.on("unhandledRejection", (e) => {
  console.log(e);
});

process.on("uncaughtException", (e) => {
  console.log(e);
});
