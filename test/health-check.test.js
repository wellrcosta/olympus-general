const blip_facade = require('../src/facades/blip-facade');
const HealthCheckController = require('../src/controllers/health-check-controller');

// Tests that the response body contains the expected data
it('should return a response with the expected data in the body', async () => {
    const mockResponse = { data: 'success' };
    const mockSend = jest.fn().mockResolvedValue(mockResponse);
    const mockRes = { send: mockSend };

    jest.spyOn(blip_facade, 'ping').mockResolvedValue(mockResponse);

    await HealthCheckController.ping(null, mockRes);

    expect(mockSend).toHaveBeenCalledWith(mockResponse);
});
