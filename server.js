const express = require('express');
const NotFoundError = require('./exceptions/not-found');
const booksRouter = require('./routes/books');

const PORT = 8080;

const app = express();
app.use(express.json()); // in order to make express parse json data in the request
app.use(booksRouter);

// registering a common app level error middlware handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof NotFoundError) {
        res.sendStatus(404);
    } else {
        res.sendStatus(500);
    }
});

// expose HTTP request endpoints
app.get('/hello-world', (req, res) => {
    // req -> Express request object -> when u as a server want to get something from the client
    // res -> Express response object -> when u as a server want to send back something to the client
    res.send('<h1>Hello World</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});