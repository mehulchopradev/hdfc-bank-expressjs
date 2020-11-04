const express = require('express');
const fs = require('fs');
const { checkBookExists } = require('../middlewares/book-exists');
const { logit } = require('../middlewares/logit');
const { getAllBooks, findBookById, findBookByTitle, saveBook, updateBook } = require('../service/books');

const router = express.Router();
router.use(logit); // this middleware will run before every route in this router

router.get('/lib/books', (req, res) => {
    //
    const query = req.query;
    let bookList;
    if (query.title) {
        bookList = findBookByTitle(query.title);
    } else {
        bookList = getAllBooks();
    }
    res.send(bookList);
});

router.get('/lib/books/:bookId', [checkBookExists], (req, res) => {
    //
    const bookId = parseInt(req.params.bookId);
    const book = findBookById(bookId);
    res.send(book);
});

router.post('/lib/books', (req, res) => {
    //
    let data = req.body;
    data = saveBook(data);

    res.status(201).send(data);
});

router.put('/lib/books/:bookId', [checkBookExists], (req, res) => {
    //
    const bookId = parseInt(req.params.bookId);
    data = req.body;
    data = updateBook(bookId, data);

    res.send(data);
});

router.get('/lib/download', (req, res) => {
    const readStream = fs.createReadStream('/Users/mehulchopra/Downloads/images_copy.zip', {
        encoding: 'utf-8'
    });

    res.attachment('images.zip');
    readStream.pipe(res);
});

module.exports = router;