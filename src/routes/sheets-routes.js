const { constants } = require('http2');
const Route = require('../models/route');
const sheetsController = require('../controllers/sheets-controller');

const routes = [];

/**
 *  @swagger
 * /saverow:
 *   get:
 *     tags:
 *     - "saverow"
 *     summary: "Save Row"
 *     description: "Save a row in a Google Sheet"
 *     responses:
 *       200:
 *         description: "Ok"
 */
routes.push(
    new Route('/saverow', constants.HTTP2_METHOD_POST, sheetsController.saveRow)
);

module.exports = routes;
