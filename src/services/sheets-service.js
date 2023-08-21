const { getSheetByIndex } = require('../facades/sheets-facade');
const {
    createGoogleSpreadsheetInstance,
    useServiceAccountAuth
} = require('../providers/google-sheets-provider');

const saveRow = async (sheetIndex, newRowData) => {
    const doc = createGoogleSpreadsheetInstance();
    await useServiceAccountAuth(doc);
    const sheet = await getSheetByIndex(sheetIndex);
    const newRow = { ...newRowData };
    await sheet.addRow(newRow);
    return newRow;
};

const getAllRows = async (sheetIndex) => {
    const doc = createGoogleSpreadsheetInstance();
    await useServiceAccountAuth(doc);
    const sheet = await getSheetByIndex(sheetIndex);
    const rows = await sheet.getRows();
    return rows;
};

const getRow = async (sheetIndex, identity) => {
    const doc = createGoogleSpreadsheetInstance();
    await useServiceAccountAuth(doc);
    const sheet = await getSheetByIndex(sheetIndex);
    const rows = await sheet.getRows();
    const foundRow = rows.find((row) => row.Identity === identity);
    return foundRow || { error: 'Row not found.' };
};

const deleteRow = async (sheetIndex, identity) => {
    const doc = createGoogleSpreadsheetInstance();
    await useServiceAccountAuth(doc);
    const sheet = await getSheetByIndex(sheetIndex);
    const rows = await sheet.getRows();
    const foundRow = rows.find((row) => row.Identity === identity);
    if (!foundRow) {
        return { error: 'Row not found.' };
    }
    await foundRow.delete();
    return { status: 'success' };
};

const updateRow = async (sheetIndex, identity, newData) => {
    const doc = createGoogleSpreadsheetInstance();
    await useServiceAccountAuth(doc);
    const sheet = await getSheetByIndex(sheetIndex);
    const rows = await sheet.getRows();
    const foundRow = rows.find((row) => row.Identity === identity);
    if (!foundRow) {
        return { error: 'Row not found.' };
    }
    Object.assign(foundRow, newData);
    await foundRow.save();
    return foundRow;
};

module.exports = {
    saveRow,
    getAllRows,
    getRow,
    deleteRow,
    updateRow
};
