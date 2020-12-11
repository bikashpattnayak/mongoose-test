const Post = require("../models/Post");

class PostController {
  getPostByUser = async (req, res, next) => {
    const data = await Post.find({ userId: req.params.userId });
    return res.status(200).json(data);
  };
}

module.exports = new PostController();
