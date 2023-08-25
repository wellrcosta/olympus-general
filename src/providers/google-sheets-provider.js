const { google } = require('googleapis');
const { sheets } = require('../config');
const LoggerProvider = require('../providers/logger-provider');
const SheetService = require('../services/sheets-service');

const loggerProvider = new LoggerProvider();
const logger = loggerProvider.getLogger();

const sheetsService = new SheetService(sheets.spreadsheet_id, 'Sheet1');
sheetsService.getAll();

module.exports = {};
