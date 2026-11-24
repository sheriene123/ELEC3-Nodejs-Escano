// Full Name: Sheriene Escano
// Section: IV-BSIT C
// Activity Code: N2
// Date: November 24, 2026

const path = require("node:path");
const { add, subtract, multiply } = require("./operations");
const { formatResult } = require("./formatter");

const operations = new Map([
    ["add", { calculate: add, symbol: "+" }],
    ["subtract", { calculate: subtract, symbol: "-" }],
    ["multiply", { calculate: multiply, symbol: "*" }],
]);

function main() {
    // The first two arguments are Node.js and the script path.
    const [operation, ...values] = process.argv.slice(2);
    const selected = operations.get(operation);

    if (!selected) {
        const script = path.basename(process.argv[1]);
        console.error(`Unknown operation. Usage: node ${script} <add|subtract|multiply> <first> <second>`);
        process.exitCode = 1;
        return;
    }

    const numbers = values.map(Number);
    if (numbers.length !== 2 || values.some((value) => !value.trim()) || !numbers.every(Number.isFinite)) {
        console.error("Enter exactly two valid numbers.");
        process.exitCode = 1;
        return;
    }

    const result = selected.calculate(...numbers);
    console.log(formatResult(numbers, selected.symbol, result));
}

main();
