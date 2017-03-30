var express = require('express');
var router = express.Router();

var db = require('../queries');

var apicache  = require('apicache');
var cache     = apicache.middleware;

//only cache 200 http code
const onlyStatus200 = req => req.statusCode === 200;

/**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       id:
 *         type: integer
 *       uuid:
 *         type: string
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       language:
 *         type: string
 *       createtime:
 *         type: string
 *   Category:
 *     properties:
 *       id:
 *         type: integer
 *       iconcolor:
 *         type: string
 *       iconurl:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       parent_id:
 *         type: integer
 *       listorder:
 *         type: integer
 */



/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns a single Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Book id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns a single Book by Id
 *         schema:
 *           $ref: '#/definitions/Book'
 */

router.get('/api/v1/books/:id', cache('1 hour', onlyStatus200), db.getSingleBook);

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags:
 *       - Categories
 *     description: Returns all categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of categories
 *         schema:
 *           $ref: '#/definitions/Category'
 */


router.get('/api/v1/categories', cache('10 minutes', onlyStatus200), db.getAllCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     description: Returns a single Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Category id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns a single Category by ID
 *         schema:
 *           $ref: '#/definitions/Category'
 */

 router.get('/api/v1/categories/:id', cache('1 hour', onlyStatus200), db.getSingleCategory);

/**
 * @swagger
 * /api/v1/books/category/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Retrieve all books in a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Category id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns an array of books of the Category 
 *         schema:
 *           $ref: '#/definitions/Books'
 */
router.get('/api/v1/books/category/:id', cache('10 minutes', onlyStatus200),db.getBooksByCategory);




module.exports = router;