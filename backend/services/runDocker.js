const { exec } = require("child_process");

function runDocker(imageName) {

    return new Promise((resolve) => {

        exec(
            `docker run -d -P ${imageName}`,
            (error, stdout, stderr) => {

                resolve({
                    success: !error,
                    containerId:
                        stdout.trim(),
                    logs:
                        stdout + stderr
                });

            }
        );

    });

}

module.exports = runDocker;