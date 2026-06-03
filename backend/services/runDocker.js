const { exec } = require("child_process");

function runDocker(imageName) {

    return new Promise((resolve) => {

        exec(
            `docker run -d -p 3000:3000 ${imageName}`,
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