#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");
const axios = require("axios");
const { globSync } = require("glob");

const BASE_URL = "https://scannerbot.xyz";
const projectKey = yargs.argv["project-key"];

const package = JSON.parse(fs.readFileSync("package.json", "utf8"));

console.log(`ScannerBot CLI V${package.version}\n`);

if (!projectKey) {
  console.log(chalk.red("Error: Flag --project-key is required"));
  console.log("\nUsage:");
  console.log(" $ npx @scannerbot/cli --project-key <PROJECT_KEY>\n");
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
  .post("/scan", { files }, { params: { project_key: projectKey } })
  .then((res) => {
    console.log(res);
    process.exit(0);
  })
  .catch((err) => {
    console.log(
      chalk.red("Failed to execute scan. HTTP status " + err.response.status)
    );
    process.exit(1);
  });
