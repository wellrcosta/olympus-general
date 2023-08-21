const {
    createGoogleSpreadsheetInstance,
    useServiceAccountAuth
} = require('../providers/google-sheets-provider');

const doc = createGoogleSpreadsheetInstance();

const getSheetByIndex = async (index) => {
    await useServiceAccountAuth(doc);
    return doc.sheetsByIndex[index];
};

module.exports = {
    getSheetByIndex
};
