const { exec } = require("child_process");

function checkContainer(containerId) {

    return new Promise((resolve) => {

        exec(
            `docker inspect -f "{{.State.Status}}" ${containerId}`,
            (err, stdout) => {

                if (err) {

                    return resolve({
                        healthy: false
                    });

                }

                const status =
                    stdout.trim();

                resolve({
                    healthy:
                        status === "running",
                    status
                });

            }
        );

    });

}

module.exports =
checkContainer;