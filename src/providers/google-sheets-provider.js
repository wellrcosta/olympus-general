const { google } = require('googleapis');
const { sheets } = require('../config');
const LoggerProvider = require('../providers/logger-provider');

const loggerProvider = new LoggerProvider();
const logger = loggerProvider.getLogger();

async function authenticate() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: sheets.client_email,
                private_key: sheets.private_key
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const client = await auth.getClient();
        const document = google.sheets({ version: 'v4', auth: client });
        logger.info('Autenticação realizada com sucesso!');
        // Retornar a instância do objeto "sheets" para uso posterior
        return document;
    } catch (error) {
        logger.error('Erro na autenticação:', error);
        return null;
    }
}

module.exports = { authenticate };
