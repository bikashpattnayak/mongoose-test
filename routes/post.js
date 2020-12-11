const express = require("express");
const postCtrl = require("../controller/post");

const router = express.Router();

router.get("/:userId", postCtrl.getPostByUser);

module.exports = router;
