const { exec } = require("child_process");

function getContainerLogs(containerId) {

    return new Promise((resolve) => {

        exec(
            `docker logs ${containerId}`,
            (err, stdout, stderr) => {

                resolve(
                    stdout + stderr
                );

            }
        );

    });

}

module.exports =
getContainerLogs;