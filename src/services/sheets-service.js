const { authenticate } = require('../providers/google-sheets-provider');
const { sheets } = require('../config');

class SheetService {
    constructor(spreadsheetId, pageName) {
        this.spreadsheetId = spreadsheetId;
        this.authenticatedDocument = authenticate(spreadsheetId);
        this.pageName = pageName;
    }

    async getAll() {
        const document = await this.authenticatedDocument;
        const { spreadsheetId, pageName } = this;
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
            return jsonData;
        }
    }

    async saveData(newData) {
        const document = await this.authenticatedDocument;
        const { spreadsheetId, pageName } = this;
        if (document) {
            const range = pageName;
            const response = await document.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: {
                    values: [Object.values(newData)]
                }
            });
            console.log(response);
            return response;
        }
    }

    async getRowByParam(param, value) {
        const document = await this.authenticatedDocument;
        const { spreadsheetId, pageName } = this;
        if (document) {
            const range = pageName;
            const response = await document.spreadsheets.values.get({
                spreadsheetId,
                range
            });
            const rows = response.data.values;
            const headers = rows[0];
            const data = rows.slice(1);
            const rowIndex = data.findIndex(
                (row) => row[headers.indexOf(param)] === value
            );
            if (rowIndex !== -1) {
                const row = data[rowIndex];
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = row[index];
                });
                console.log(rowData);
                return rowData;
            }
            console.log(
                `Não foi encontrada uma linha com ${param} igual a ${value}`
            );
            return null;
        }
    }

    async deleteRowByParam(param, value) {
        const document = await this.authenticatedDocument;
        const { spreadsheetId, pageName } = this;
        if (document) {
            const range = pageName;
            const response = await document.spreadsheets.values.get({
                spreadsheetId,
                range
            });
            const rows = response.data.values;
            const headers = rows[0];
            const data = rows.slice(1);
            const rowIndex = data.findIndex(
                (row) => row[headers.indexOf(param)] === value
            );
            if (rowIndex !== -1) {
                const rangeToDelete = `${pageName}!${rowIndex + 2}:${rowIndex +
                    2}`;
                const deleteResponse = await document.spreadsheets.values.clear(
                    {
                        spreadsheetId,
                        range: rangeToDelete
                    }
                );
                console.log(deleteResponse);
                return deleteResponse;
            }
            console.log(
                `Não foi encontrada uma linha com ${param} igual a ${value}`
            );
            return null;
        }
    }

    async updateRowByParam(param, value, newData) {
        const document = await this.authenticatedDocument;
        const { spreadsheetId, pageName } = this;
        if (document) {
            const range = pageName;
            const response = await document.spreadsheets.values.get({
                spreadsheetId,
                range
            });
            const rows = response.data.values;
            const headers = rows[0];
            const data = rows.slice(1);
            const rowIndex = data.findIndex(
                (row) => row[headers.indexOf(param)] === value
            );
            if (rowIndex !== -1) {
                const rangeToUpdate = `${pageName}!${rowIndex + 2}:${rowIndex +
                    2}`;
                const updateResponse = await document.spreadsheets.values.update(
                    {
                        spreadsheetId,
                        range: rangeToUpdate,
                        valueInputOption: 'RAW',
                        resource: {
                            values: [Object.values(newData)]
                        }
                    }
                );
                console.log(updateResponse);
                return updateResponse;
            }
            console.log(
                `Não foi encontrada uma linha com ${param} igual a ${value}`
            );
            return null;
        }
    }
}

module.exports = SheetService;
