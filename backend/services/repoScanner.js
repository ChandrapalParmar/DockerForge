const fs = require("fs");
const path = require("path");

function scanRepo(repoPath) {

    const importantFiles = [];

    const files = fs.readdirSync(repoPath);

    for (const file of files) {

        const fullPath =
            path.join(repoPath, file);

        if (
            fs.statSync(fullPath).isDirectory()
        ) {
            continue;
        }

        if (
            file === "package.json" ||
            file === "package-lock.json" ||
            file === "yarn.lock" ||
            file === "requirements.txt" ||
            file === "pom.xml" ||
            file === "build.gradle" ||
            file.endsWith(".csproj") ||
            file === "README.md"
        ) {

            importantFiles.push({
                name: file,
                content:
                    fs.readFileSync(
                        fullPath,
                        "utf8"
                    )
            });

        }
    }

    return importantFiles;
}

module.exports = scanRepo;