const { authenticate } = require('../providers/google-sheets-provider');
const { sheets } = require('../config');

// Exemplo de uso para obter dados de uma planilha
async function getDataFromSheet(pageName) {
    const spreadsheetId = sheets.spreadsheet_id;

    const document = await authenticate(spreadsheetId);
    if (document) {
        const range = pageName;
        const response = await document.spreadsheets.values.get({
            spreadsheetId,
            range
        });

        const rows = response.data.values;
        const headers = rows[0];
        const data = rows.slice(1);

        // Converter os dados em um array de objetos JSON
        const jsonData = data.map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index];
            });
            return rowData;
        });

        console.log(jsonData);
    }
}

getDataFromSheet('Sheet1');

module.exports = {
    getDataFromSheet
};
