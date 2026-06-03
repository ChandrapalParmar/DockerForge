const { exec } = require("child_process");

function buildDocker(repoPath) {

    return new Promise((resolve) => {

        const imageName =
            `dockerforge-${Date.now()}`;

        exec(
            `docker build -t ${imageName} .`,
            {
                cwd: repoPath,
                timeout: 300000 // 5 min
            },
            (error, stdout, stderr) => {

                resolve({
                    success: !error,
                    imageName,
                    logs: stdout + stderr
                });

            }
        );

    });

}

module.exports = buildDocker;