const { constants } = require('http2');
const Route = require('../models/route');
const sheetsController = require('../controllers/sheets-controller');
const {
    get_all_body_schema,
    save_data_body_schema,
    get_row_by_param_body_schema,
    delete_row_by_param_body_schema,
    update_row_by_param_body_schema
} = require('../validators/sheets-validators');

const routes = [];

/**
 *  @swagger
 * /save:
 *   post:
 *     tags:
 *     - "Sheets"
 *     summary: "Save a new row"
 *     description: "Save a new row in the sheet"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Body example"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           spreadsheetId:
 *              type: "string"
 *           pageName:
 *              type: "string"
 *           newData:
 *              type: "object"
 *     responses:
 *       201:
 *         description: "Created"
 *       404:
 *         description: "Bad request"
 *       500:
 *         description: "Internal Server Error"
 */
routes.push(
    new Route('/save', constants.HTTP2_METHOD_POST, sheetsController.saveRow, {
        body: save_data_body_schema
    })
);

/**
 *  @swagger
 * /getAll:
 *   post:
 *     tags:
 *     - "Sheets"
 *     summary: "Get All Rows"
 *     description: "Get All Rows from the sheet"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Body example"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           spreadsheetId:
 *              type: "string"
 *           pageName:
 *              type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       404:
 *         description: "Bad request"
 *       500:
 *         description: "Internal Server Error"
 */
routes.push(
    new Route(
        '/getAll',
        constants.HTTP2_METHOD_POST,
        sheetsController.getAllRows,
        { body: get_all_body_schema }
    )
);

/**
 *  @swagger
 * /getSpecific:
 *   post:
 *     tags:
 *     - "Sheets"
 *     summary: "Get Specific Row"
 *     description: "Get Specific Row from the sheet"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Body example"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           spreadsheetId:
 *              type: "string"
 *           pageName:
 *              type: "string"
 *           param:
 *              type: "string"
 *           value:
 *              type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       404:
 *         description: "Bad request"
 *       500:
 *         description: "Internal Server Error"
 */
routes.push(
    new Route(
        '/getSpecific',
        constants.HTTP2_METHOD_POST,
        sheetsController.getRow,
        {
            body: get_row_by_param_body_schema
        }
    )
);

/**
 *  @swagger
 * /update:
 *   post:
 *     tags:
 *     - "Sheets"
 *     summary: "Update the entire row"
 *     description: "Update the entire row in the sheet"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Body example"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           spreadsheetId:
 *              type: "string"
 *           pageName:
 *              type: "string"
 *           param:
 *              type: "string"
 *           value:
 *              type: "string"
 *           newData:
 *              type: "object"
 *     responses:
 *       200:
 *         description: "OK"
 *       404:
 *         description: "Bad request"
 *       500:
 *         description: "Internal Server Error"
 */
routes.push(
    new Route(
        '/update',
        constants.HTTP2_METHOD_POST,
        sheetsController.updateRow,
        { body: update_row_by_param_body_schema }
    )
);

/**
 *  @swagger
 * /delete:
 *   post:
 *     tags:
 *     - "Sheets"
 *     summary: "Delete the entire row"
 *     description: "Delete a specific row in the sheet"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Body example"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           spreadsheetId:
 *              type: "string"
 *           pageName:
 *              type: "string"
 *           param:
 *              type: "string"
 *           value:
 *              type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       404:
 *         description: "Bad request"
 *       500:
 *         description: "Internal Server Error"
 */
routes.push(
    new Route(
        '/delete',
        constants.HTTP2_METHOD_POST,
        sheetsController.deleteRow,
        { body: delete_row_by_param_body_schema }
    )
);

module.exports = routes;
