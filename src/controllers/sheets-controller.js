/* eslint-disable indent */
const SheetService = require('../services/sheets-service');

class SheetController {
    async saveRow(req, res) {
        const { spreadsheetId, pageName, newData } = req.body;
        const sheets_service = new SheetService(spreadsheetId, pageName);
        const saveData = await sheets_service.saveData(newData);
        switch (saveData.status) {
            case 'success':
                res.status(201).json(saveData.message);
                break;
            case 'error':
                res.status(500).json(saveData.message);
                break;
            default:
                res.status(404).json(saveData.message);
                break;
        }
    }

    async getAllRows(req, res) {
        const { spreadsheetId, pageName } = req.body;
        const sheets_service = new SheetService(spreadsheetId, pageName);
        const getAllRows = await sheets_service.getAllRows();
        switch (getAllRows.status) {
            case 'success':
                res.status(200).json(getAllRows.message);
                break;
            case 'error':
                res.status(500).json(getAllRows.message);
                break;
            default:
                res.status(404).json(getAllRows.message);
                break;
        }
    }

    async getRow(req, res) {
        const { spreadsheetId, pageName, param, value } = req.body;
        const sheets_service = new SheetService(spreadsheetId, pageName);
        const getRow = await sheets_service.getRow(param, value);
        switch (getRow.status) {
            case 'success':
                res.status(200).json(getRow.message);
                break;
            case 'error':
                res.status(500).json(getRow.message);
                break;
            default:
                res.status(404).json(getRow.message);
                break;
        }
    }

    async deleteRow(req, res) {
        const { spreadsheetId, pageName, param, value } = req.body;
        const sheets_service = new SheetService(spreadsheetId, pageName);
        const deleteRow = await sheets_service.deleteRow(param, value);
        switch (deleteRow.status) {
            case 'success':
                res.status(200).json(deleteRow.message);
                break;
            case 'error':
                res.status(500).json(deleteRow.message);
                break;
            default:
                res.status(404).json(deleteRow.message);
                break;
        }
    }

    async updateRow(req, res) {
        const { spreadsheetId, pageName, param, value, newData } = req.body;
        const sheets_service = new SheetService(spreadsheetId, pageName);
        const updateRow = await sheets_service.updateRow(param, value, newData);
        switch (updateRow.status) {
            case 'success':
                res.status(200).json(updateRow.message);
                break;
            case 'error':
                res.status(500).json(updateRow.message);
                break;
            default:
                res.status(404).json(updateRow.message);
                break;
        }
    }
}

module.exports = new SheetController();
