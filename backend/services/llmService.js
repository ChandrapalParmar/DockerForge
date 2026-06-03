const axios = require("axios");
console.log("OPENROUTER_API_KEY =", process.env.OPENROUTER_API_KEY);
async function askLLM(prompt) {

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.error("OPENROUTER ERROR:");
        console.error(error.response?.data);
        console.error(error.response?.status);

        throw error;
    }
}

module.exports = askLLM;