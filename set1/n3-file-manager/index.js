// Full Name: Sheriene Escano
// Section: IV-BSIT C
// Activity Code: N3
// Date: November 24, 2026

const fs = require("node:fs");
const path = require("node:path");

const filesDirectory = path.join(__dirname, "files");

function createFile(filePath, content) {
    fs.mkdirSync(filesDirectory, { recursive: true });
    fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "wx" });
    console.log(`Created ${path.basename(filePath)}.`);
}

function readFile(filePath) {
    console.log(fs.readFileSync(filePath, "utf8"));
}

function updateFile(filePath, content) {
    // Append to an existing file without creating it if it is missing.
    const file = fs.openSync(filePath, fs.constants.O_WRONLY | fs.constants.O_APPEND);
    try {
        fs.writeFileSync(file, content, "utf8");
    } finally {
        fs.closeSync(file);
    }
    console.log(`Updated ${path.basename(filePath)}.`);
}

function deleteFile(filePath) {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${path.basename(filePath)}.`);
}

function listFiles() {
    fs.mkdirSync(filesDirectory, { recursive: true });
    const filenames = fs.readdirSync(filesDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .sort();

    if (filenames.length === 0) {
        console.log("No files found.");
        return;
    }

    for (const filename of filenames) {
        const filePath = path.join(filesDirectory, filename);
        console.log(`Full path: ${filePath}`);
        console.log(`File name: ${path.basename(filePath)}`);
        console.log(`Extension: ${path.extname(filePath)}`);
        console.log("Contents:");
        readFile(filePath);
        console.log();
    }
}

const fileCommands = new Map([
    ["create", createFile],
    ["read", readFile],
    ["update", updateFile],
    ["delete", deleteFile],
]);

function main() {
    const [command, filename, ...content] = process.argv.slice(2);
    if (command === "list") {
        try {
            listFiles();
        } catch (error) {
            console.error(`Unable to list files: ${error.message}`);
            process.exitCode = 1;
        }
        return;
    }

    const runCommand = fileCommands.get(command);
    if (!runCommand) {
        console.error("Usage: node index.js <create|read|update|delete> <file.txt> [content], or node index.js list");
        process.exitCode = 1;
        return;
    }

    // Accept a plain text filename so operations stay inside the files folder.
    if (!filename || /[<>:"/\\|?*\x00-\x1f]/.test(filename) || path.extname(filename).toLowerCase() !== ".txt") {
        console.error("Enter a plain filename ending in .txt.");
        process.exitCode = 1;
        return;
    }

    const filePath = path.join(filesDirectory, filename);
    try {
        runCommand(filePath, content.join(" "));
    } catch (error) {
        if (error.code === "ENOENT") {
            console.error(`File not found: ${filename}`);
        } else if (error.code === "EEXIST") {
            console.error(`File already exists: ${filename}`);
        } else {
            console.error(`Unable to ${command} ${filename}: ${error.message}`);
        }
        process.exitCode = 1;
    }
}

main();
