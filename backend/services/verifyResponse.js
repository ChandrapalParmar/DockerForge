const axios = require("axios");

async function verifyResponse() {

    const ports = [3000, 8080, 5000];

    for (const port of ports) {

        try {

            const response =
                await axios.get(
                    `http://localhost:${port}`,
                    {
                        timeout: 3000
                    }
                );

            return {
                healthy: true,
                port,
                status: response.status
            };

        } catch (error) {
            // try next port
        }
    }

    return {
        healthy: false
    };
}

module.exports = verifyResponse;