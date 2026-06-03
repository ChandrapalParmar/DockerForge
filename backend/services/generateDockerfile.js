const fs = require("fs");
const path = require("path");

async function generateDockerfile(repoPath) {

    const packagePath =
        path.join(repoPath, "package.json");

    let startCommand =
        'CMD ["node","index.js"]';

    if (fs.existsSync(packagePath)) {

        const pkg =
            JSON.parse(
                fs.readFileSync(
                    packagePath,
                    "utf8"
                )
            );

        if (pkg.scripts?.start) {

            startCommand =
                'CMD ["npm","start"]';

        } else if (pkg.main) {

            startCommand =
                `CMD ["node","${pkg.main}"]`;
        }
    }

    return `
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

${startCommand}
`;
}

module.exports =
generateDockerfile;