exports.logit = function (req, res, next) {
    console.log(req.url);
    console.log(new Date());

    next(); // this will forward the request to the next middleware or router callback in line
};