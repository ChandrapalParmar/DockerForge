const fs = require("fs");
const path = require("path");
const fixDockerfile =
require("./fixDockerfile");

async function retryBuild(
    buildDocker,
    repoPath,
    dockerfileContent,
    maxAttempts = 3
) {

    let attempts = 0;
    let result;

    while (attempts < maxAttempts) {

        attempts++;

        result =
            await buildDocker(repoPath);

        if (result.success) {

            result.attempts =
                attempts;

            return result;
        }

        dockerfileContent =
            fixDockerfile(
                dockerfileContent,
                result.logs
            );

        fs.writeFileSync(
            path.join(
                repoPath,
                "Dockerfile"
            ),
            dockerfileContent
        );
    }

    result.attempts =
        attempts;

    return result;
}

module.exports =
retryBuild;