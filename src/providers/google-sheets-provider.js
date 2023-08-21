const { GoogleSpreadsheet } = require('google-spreadsheet');
const { sheets } = require('../config');

const createGoogleSpreadsheetInstance = () => {
    const doc = new GoogleSpreadsheet(sheets.spreadsheet_id);
    return doc;
};

const useServiceAccountAuth = async (doc) => {
    await doc.useServiceAccountAuth({
        client_email: sheets.client_email,
        private_key: sheets.private_key
    });
};

module.exports = {
    createGoogleSpreadsheetInstance,
    useServiceAccountAuth
};
