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

function main() {
    const [command, filename, ...content] = process.argv.slice(2);
    if (command !== "create" && command !== "read") {
        console.error("Usage: node index.js create <file.txt> <content> or read <file.txt>");
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
        if (command === "create") {
            createFile(filePath, content.join(" "));
        } else {
            readFile(filePath);
        }
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
