const fs = require("fs");
const path = require("path");
const buildDocker =
require("./buildDocker");
const cloneRepo =
    require("./cloneRepo");

const scanRepo =
    require("./repoScanner");

const generateDockerfile =
    require("./generateDockerfile");
const checkContainer =
require("./checkContainer");
const getContainerLogs =
require("./getContainerLogs");
const runDocker =
require("./runDocker");
const retryBuild =
require("./retryBuild");


async function dockerAgent(githubUrl) {

    // Clone Repo

    const repoPath =
        await cloneRepo(githubUrl);

    // Scan Repo

    const files =
        scanRepo(repoPath);

    // Generate Dockerfile

  let dockerContent =
await generateDockerfile(repoPath);

dockerContent =
dockerContent
.replace(/```dockerfile/g,"")
.replace(/```/g,"")
.trim();

    // Save Dockerfile

    fs.writeFileSync(
        path.join(repoPath, "Dockerfile"),
        dockerContent
    );
    
const buildResult =
await retryBuild(
    buildDocker,
    repoPath,
    3
);

let runResult = null;
let healthResult = null;

if (buildResult.success) {

    runResult =
        await runDocker(
            buildResult.imageName
        );

    if (runResult.success) {

        await new Promise(
            r => setTimeout(r, 5000)
        );

        healthResult =
            await checkContainer(
                runResult.containerId
            );

        if (
            !healthResult.healthy
        ) {

            healthResult.logs =
                await getContainerLogs(
                    runResult.containerId
                );

        }
    }
}
   return {
    success: true,
    detectedFiles:
        files.map(f => f.name),

    dockerfile:
        dockerContent,

    buildResult,

    runResult,

    healthResult
};
}

module.exports = dockerAgent;