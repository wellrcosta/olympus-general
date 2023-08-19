const { GoogleSpreadsheet } = require('google-spreadsheet');
const { sheets } = require('../config');

const doc = new GoogleSpreadsheet(sheets.spreadsheet_id);

// Credenciais do Google Sheets
const credentials = {
    client_email: sheets.client_email,
    private_key: sheets.private_key
};

const useServiceAccountAuth = async () => {
    await doc.useServiceAccountAuth(credentials);
};

useServiceAccountAuth();

// Definindo o campo único (coluna) para validação
const uniqueField = 'Número de Telefone';

// Endpoint para salvar dados na planilha
const saveRow = async (req, res) => {
    try {
        const sheet = await doc.sheetsByIndex[0];
        const newRow = {};
        newRow[uniqueField] = req.body[uniqueField];
        // Verifica se o campo único já existe
        const rows = await sheet.getRows();
        const existingRow = rows.find(
            (row) => row[uniqueField] === newRow[uniqueField]
        );
        if (existingRow) {
            return res
                .status(400)
                .json({ error: `${uniqueField} já existe na planilha.` });
        }
        Object.assign(newRow, req.body);
        await sheet.addRow(newRow);
        return res.status(201).json(newRow);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao salvar na planilha.' });
    }
};

// Endpoint para buscar todos os dados na planilha
const getAllRows = async (req, res) => {
    try {
        const sheet = await doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: 'Erro ao buscar dados na planilha.' });
    }
};

// Endpoint para buscar um dado específico na planilha
const getRow = async (req, res) => {
    try {
        const sheet = await doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        const foundRow = rows.find(
            (row) => row[uniqueField] === req.params.telefone
        );
        if (!foundRow) {
            return res.status(404).json({ error: 'Dado não encontrado.' });
        }
        return res.status(200).json(foundRow);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: 'Erro ao buscar dado na planilha.' });
    }
};

// Endpoint para deletar um dado específico na planilha
const deleteRow = async (req, res) => {
    try {
        const sheet = await doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        const foundRow = rows.find(
            (row) => row[uniqueField] === req.params.telefone
        );
        if (!foundRow) {
            return res.status(404).json({ error: 'Dado não encontrado.' });
        }
        await foundRow.delete();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: 'Erro ao deletar dado na planilha.' });
    }
};

// Endpoint para alterar um campo específico na planilha, podendo ser o campo único ou algum outro campo
const updateRow = async (req, res) => {
    try {
        const sheet = await doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        const foundRow = rows.find(
            (row) => row[uniqueField] === req.params.updateField
        );
        if (!foundRow) {
            return res.status(404).json({ error: 'Dado não encontrado.' });
        }
        Object.assign(foundRow, req.body);
        await foundRow.save();
        return res.status(200).json(foundRow);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: 'Erro ao alterar dado na planilha.' });
    }
};

module.exports = { saveRow, getAllRows, getRow, deleteRow, updateRow };
