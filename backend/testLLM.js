require("dotenv").config();

const askLLM =
require("./services/llmService");

async function test() {

    try {

        const result =
            await askLLM("Say Hello");

        console.log(result);

    } catch (error) {

        console.error("LLM Error:");

        console.error(
            error.response?.data ||
            error.message
        );
    }
}

test();