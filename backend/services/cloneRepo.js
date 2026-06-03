const git = require("simple-git");
const path = require("path");
const fs = require("fs-extra");

async function cloneRepo(repoUrl) {
    try {

        const repoPath =
            path.join(__dirname, "../tempRepos/repo");

        await fs.remove(repoPath);

        if (!repoUrl.endsWith(".git")) {
            repoUrl += ".git";
        }

        console.log("Cloning:", repoUrl);

        await git().clone(repoUrl, repoPath);

        return repoPath;

    } catch (error) {

        console.error("Clone Error:", error);

        throw error;
    }
}

module.exports = cloneRepo;