const dockerAgent = require("../services/dockerAgent");

exports.generateDockerfile = async (req, res) => {

    try {

        const { githubUrl } = req.body;

        const result =
            await dockerAgent(githubUrl);

        res.json(result);

    }
    catch (err) {

    console.error(err);

    res.status(500).json({
        error: err.message,
        details: err.response?.data
    });

}
    
};