#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");
const axios = require("axios");
const { globSync } = require("glob");

const BASE_URL = "https://scannerbot.xyz";
const projectToken = yargs.argv["project-token"];

const package = JSON.parse(fs.readFileSync("package.json", "utf8"));

console.log(`ScannerBot CLI V${package.version}\n`);

if (!projectToken) {
  console.log(chalk.red("Error: Flag --project-token is required"));
  console.log("\nUsage:");
  console.log(" $ npx @scannerbot/cli --project-token <PROJECT_KEY>\n");
  process.exit(1);
}

const client = axios.create({
  baseURL: (yargs.argv["base-url"] || BASE_URL) + "/api",
});

const solFilePaths = globSync("**/*.sol");
const total = solFilePaths.length;

console.log(chalk.cyan(`Scanning ${total} file${total > 1 ? "s" : ""}:`));

const files = [];

solFilePaths.forEach((filePath) => {
  console.log(chalk.cyan(` - ${filePath}`));
  files.push({
    path: filePath,
    source: fs.readFileSync(filePath, "utf8"),
  });
});

client
  .post("/scans", { files }, { params: { project_token: projectToken } })
  .then((res) => {
    console.log(chalk.green("Scan execution is processing\n"));
    console.log(
      "You can follow the scan progress at this link: " +
        chalk.bold(res.data.url) +
        "\n"
    );
    process.exit(0);
  })
  .catch((err) => {
    console.log(
      chalk.red("Failed to execute scan: " + err.response.data.message)
    );
    process.exit(1);
  });
