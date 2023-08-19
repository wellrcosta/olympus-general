const blip_service = require('../services/blip-service');

const ping = async () => {
    try {
        const command_res = await blip_service.ping();
        return command_res.status;
    } catch (error) {
        return `Failed to ping ${error}`;
    }
};

module.exports = { ping };
