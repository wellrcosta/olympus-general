const yup = require('yup');

const get_all_body_schema = yup.object().shape({
    spreadsheetId: yup.string().required(),
    pageName: yup.string().required()
});

const save_data_body_schema = yup.object().shape({
    spreadsheetId: yup.string().required(),
    pageName: yup.string().required(),
    newData: yup.object().required()
});

const get_row_by_param_body_schema = yup.object().shape({
    spreadsheetId: yup.string().required(),
    pageName: yup.string().required(),
    param: yup.string().required(),
    value: yup.string().required()
});

const delete_row_by_param_body_schema = yup.object().shape({
    spreadsheetId: yup.string().required(),
    pageName: yup.string().required(),
    param: yup.string().required(),
    value: yup.string().required()
});

const update_row_by_param_body_schema = yup.object().shape({
    spreadsheetId: yup.string().required(),
    pageName: yup.string().required(),
    param: yup.string().required(),
    value: yup.string().required(),
    newData: yup.object().required()
});

module.exports = {
    get_all_body_schema,
    save_data_body_schema,
    get_row_by_param_body_schema,
    delete_row_by_param_body_schema,
    update_row_by_param_body_schema
};
