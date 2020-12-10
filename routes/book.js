const express = require("express");
const bookctrl = require("../controller/book");

const router = express.Router();

router.get("/", bookctrl.findBooks);

module.exports = router;
