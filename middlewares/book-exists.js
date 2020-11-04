const { findBookById } = require('../service/books');
const NotFoundError = require('../exceptions/not-found');

// middleware function, it shud take 3 parameters
exports.checkBookExists = function (req, res, next) {
    const bookId = parseInt(req.params.bookId);
    const book = findBookById(bookId);
    if (!book) {
        // res.sendStatus(404); // no use going ahead. Send back the response from here itself
        throw new NotFoundError(`Book with id ${bookId} was not found`);
    } else {
        next(); // go ahead with the next callback in the request chain
    }
};