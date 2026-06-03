const router = require("express").Router();

const {
    generateDockerfile
} = require("../controllers/dockerController");

router.post("/generate", generateDockerfile);

module.exports = router;