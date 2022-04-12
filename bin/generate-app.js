const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You must provide a name for your app");
  console.log("For example: ");
  console.log("\t npx pdx-create-express-app my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo =
  "https://github.com/PdxCodeGuild/advjs-2022-express-boilerplate";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The directory ${projectName} already exists in the current working directory.`
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

const main = async () => {
  try {
    console.log("Cloning repository...");
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    execSync("yarn install");

    console.log("Removing boilerplate script");
    execSync("npx rimraf ./.git");
    fs.rmdirSync(path.join(projectPath, "bin"), {
      recursive: true,
      force: true,
    });

    console.log("Installation complete, happy hacking!");
  } catch (err) {
    console.error(err);
  }
};

main();
