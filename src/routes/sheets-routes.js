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

routes.push(
    new Route('/save', constants.HTTP2_METHOD_POST, sheetsController.saveRow, {
        body: save_data_body_schema
    })
);

routes.push(
    new Route(
        '/getall',
        constants.HTTP2_METHOD_POST,
        sheetsController.getAllRows,
        { body: get_all_body_schema }
    )
);

routes.push(
    new Route('/getone', constants.HTTP2_METHOD_POST, sheetsController.getRow, {
        body: get_row_by_param_body_schema
    })
);

routes.push(
    new Route(
        '/update',
        constants.HTTP2_METHOD_POST,
        sheetsController.updateRow,
        { body: update_row_by_param_body_schema }
    )
);

routes.push(
    new Route(
        '/delete',
        constants.HTTP2_METHOD_POST,
        sheetsController.deleteRow,
        { body: delete_row_by_param_body_schema }
    )
);

module.exports = routes;
