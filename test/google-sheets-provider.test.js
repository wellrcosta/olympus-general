const { google } = require('googleapis');
// const { sheets } = require('../src/config');
const LoggerProvider = require('../src/providers/logger-provider');
const { authenticate } = require('../src/providers/google-sheets-provider');

const loggerProvider = new LoggerProvider();
const logger = loggerProvider.getLogger();

// Tests that the function returns null when unable to authenticate with invalid credentials
it('should return null when unable to authenticate with invalid credentials', async () => {
    // Mock the google.auth.GoogleAuth class to throw an error
    const authMock = jest.fn().mockImplementation(() => {
        throw new Error('Invalid credentials');
    });
    google.auth.GoogleAuth = authMock;

    // Mock the logger.error function
    logger.error = jest.fn();

    // Call the authenticate function
    const result = await authenticate();

    // Assertions
    expect(logger.error).toHaveBeenCalledWith(
        'Erro na autenticação:',
        new Error('Invalid credentials')
    );
    expect(result).toBeNull();
});

// Tests that the function returns null when unable to authenticate with missing credentials
it('should return null when unable to authenticate with missing credentials', async () => {
    // Mock the google.auth.GoogleAuth class to throw an error
    const authMock = jest.fn().mockImplementation(() => {
        throw new Error('Missing credentials');
    });
    google.auth.GoogleAuth = authMock;

    // Mock the logger.error function
    const loggerErrorMock = jest.spyOn(logger, 'error');
    loggerErrorMock.mockImplementation();

    // Call the authenticate function
    const result = await authenticate();

    // Assertions
    expect(loggerErrorMock).toHaveBeenCalledWith(
        'Erro na autenticação:',
        new Error('Missing credentials')
    );
    expect(result).toBeNull();
});

// Tests that the function returns null when unable to authenticate with invalid scope
it('should return null when unable to authenticate with invalid scope', async () => {
    // Mock the google.auth.GoogleAuth class to throw an error
    const authMock = jest.fn().mockImplementation(() => {
        throw new Error('Invalid scope');
    });
    google.auth.GoogleAuth = authMock;

    // Mock the logger.error function
    logger.error = jest.fn();

    // Call the authenticate function
    const result = await authenticate();

    // Assertions
    expect(logger.error).toHaveBeenCalledWith(
        'Erro na autenticação:',
        new Error('Invalid scope')
    );
    expect(result).toBeNull();
});
