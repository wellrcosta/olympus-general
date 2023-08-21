const sheets_service = require('../services/sheets-service');

class SheetController {
    async saveRow(req, res) {
        const { body } = req;
        const newRow = await sheets_service.saveRow(0, body);
        res.json(newRow);
    }

    async getAllRows(_, res) {
        const rows = await sheets_service.getAllRows(0);
        res.json(rows);
    }

    async getRow(req, res) {
        const { Identity } = req.body;
        const row = await sheets_service.getRow(0, Identity);
        res.json(row);
    }

    async deleteRow(req, res) {
        const { Identity } = req.body;
        const result = await sheets_service.deleteRow(0, Identity);
        res.json(result);
    }

    async updateRow(req, res) {
        const { Identity } = req.body;
        const updatedRow = await sheets_service.updateRow(
            0,
            Identity,
            req.body
        );
        res.json(updatedRow);
    }
}

module.exports = new SheetController();
