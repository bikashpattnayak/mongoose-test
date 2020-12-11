const express = require("express");
const postCtrl = require("../controller/post");

const router = express.Router();

router.get("/:userId", postCtrl.getPostByUser);
router.get("/", postCtrl.getAllPosts);

module.exports = router;
