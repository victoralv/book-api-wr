  var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://readonly:dGUA1thwtznKWeqohU1lwl@wrtest.cgxehdr5uwty.eu-west-1.rds.amazonaws.com/wrtest';
var db = pgp(connectionString);


function getAllCategories(req, res, next) {
  db.any('select * from category')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL categories'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleBook(req, res, next) {
  var bookID = parseInt(req.params.id);
  db.one('select * from book where id = $1', bookID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE book'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleCategory(req, res, next) {
  var categoryID = parseInt(req.params.id);
  db.one('select * from category where id = $1', categoryID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE category'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getBooksByCategory(req, res, next) {
  var categoryID = parseInt(req.params.id);
  db.any('select book.* from category_book INNER JOIN book ON (book.id = category_book.books_id)  where category_book.categories_id = $1', categoryID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE category'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getSingleBook: getSingleBook,
  getAllCategories: getAllCategories,
  getSingleCategory: getSingleCategory,
  getBooksByCategory: getBooksByCategory
};
