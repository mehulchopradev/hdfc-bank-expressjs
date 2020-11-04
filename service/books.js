const books = require('../db/books');

let id = 2;

function getAllBooks() {
    return books;
}

function findBookById(bookId) {
    return books.find(book => book.id === bookId);
}

function findBookByTitle(title) {
    return books.filter(book => book.title.includes(title));
}

function saveBook(data) {
    data.id = ++id;
    books.push(data);

    return data;
}

function updateBook(bookId, data) {
    const book = findBookById(bookId);
    book.title = data.title;
    book.price = data.price;
    book.pages = data.pages;
    return book;
}

module.exports = {
    getAllBooks,
    findBookById,
    findBookByTitle,
    saveBook,
    updateBook,
}