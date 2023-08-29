const { authenticate } = require('../providers/google-sheets-provider');

class SheetService {
    constructor(spreadsheetId, pageName) {
        this.spreadsheetId = spreadsheetId;
        this.authenticatedDocument = authenticate(spreadsheetId);
        this.pageName = pageName;
    }

    async getAll() {
        try {
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
                return { status: 'success', message: jsonData };
            }
        } catch (error) {
            return { status: 'error', message: error };
        }
    }

    async saveData(newData) {
        try {
            const document = await this.authenticatedDocument;
            const { spreadsheetId, pageName } = this;
            if (document) {
                const range = pageName;
                await document.spreadsheets.values.append({
                    spreadsheetId,
                    range,
                    valueInputOption: 'RAW',
                    resource: {
                        values: [Object.values(newData)]
                    }
                });
                return { status: 'success', message: 'Salvo com sucesso!' };
            }
        } catch (error) {
            return { status: 'error', message: error };
        }
    }

    async getRowByParam(param, value) {
        try {
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
                    return { status: 'success', message: rowData };
                }
                return {
                    status: 'warning',
                    message: `Não foi encontrada uma linha com ${param} igual a ${value}`
                };
            }
        } catch (error) {
            return { status: 'error', message: error };
        }
    }

    async deleteRowByParam(param, value) {
        try {
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
                    const rangeToDelete = `${pageName}!${rowIndex +
                        2}:${rowIndex + 2}`;
                    await document.spreadsheets.values.clear({
                        spreadsheetId,
                        range: rangeToDelete
                    });
                    return {
                        status: 'success',
                        message: 'Deletado com sucesso!'
                    };
                }
                return {
                    status: 'warning',
                    message: `Não foi encontrada uma linha com ${param} igual a ${value}`
                };
            }
        } catch (error) {
            return { status: 'error', message: error };
        }
    }

    async updateRowByParam(param, value, newData) {
        try {
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
                    const rangeToUpdate = `${pageName}!${rowIndex +
                        2}:${rowIndex + 2}`;
                    await document.spreadsheets.values.update({
                        spreadsheetId,
                        range: rangeToUpdate,
                        valueInputOption: 'RAW',
                        resource: {
                            values: [Object.values(newData)]
                        }
                    });
                    return {
                        status: 'success',
                        message: 'Alterado com sucesso!'
                    };
                }
                return {
                    status: 'warning',
                    message: `Não foi encontrada uma linha com ${param} igual a ${value}`
                };
            }
        } catch (error) {
            return { status: 'error', message: error };
        }
    }
}

module.exports = SheetService;
