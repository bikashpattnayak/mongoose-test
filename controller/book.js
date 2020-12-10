const Book = require("../models/Book");

class BookController {
  findBooks = async (req, res, next) => {
    const books = await Book.find();
    return res.status(200).json(books);
  };
}
module.exports = new BookController();
