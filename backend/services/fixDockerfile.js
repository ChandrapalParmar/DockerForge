function fixDockerfile(dockerfile, logs) {

    // Case 1
    if (
        logs.includes("Cannot find module") &&
        dockerfile.includes('CMD ["node","index.js"]')
    ) {

        return dockerfile.replace(
            'CMD ["node","index.js"]',
            'CMD ["node","server.js"]'
        );
    }

    // Case 2
    if (
        logs.includes("Missing script: start")
    ) {

        return dockerfile.replace(
            'CMD ["npm","start"]',
            'CMD ["node","server.js"]'
        );
    }

    return dockerfile;
}

module.exports = fixDockerfile;