// Full Name: Sheriene Escano
// Section: IV-BSIT C
// Activity Code: N2
// Date: November 24, 2026

const path = require("node:path");
const { add, subtract, multiply, divide, average } = require("./operations");
const { formatResult } = require("./formatter");

const operations = new Map([
    ["add", { calculate: add, symbol: "+" }],
    ["subtract", { calculate: subtract, symbol: "-" }],
    ["multiply", { calculate: multiply, symbol: "*" }],
    ["divide", { calculate: divide, symbol: "/" }],
    ["average", { calculate: average }],
]);

function main() {
    // The first two arguments are Node.js and the script path.
    const [operation, ...values] = process.argv.slice(2);
    const selected = operations.get(operation);

    if (!selected) {
        const script = path.basename(process.argv[1]);
        const supported = [...operations.keys()].join("|");
        console.error(`Unknown operation. Usage: node ${script} <${supported}> <numbers...>`);
        process.exitCode = 1;
        return;
    }

    const numbers = values.map(Number);
    const isAverage = operation === "average";
    const validCount = isAverage ? numbers.length > 0 : numbers.length === 2;
    if (!validCount || values.some((value) => !value.trim()) || !numbers.every(Number.isFinite)) {
        console.error(isAverage ? "Enter at least one valid number." : "Enter exactly two valid numbers.");
        process.exitCode = 1;
        return;
    }

    let result;
    try {
        result = selected.calculate(...numbers);
    } catch (error) {
        if (!(error instanceof RangeError)) {
            throw error;
        }
        console.error(error.message);
        process.exitCode = 1;
        return;
    }

    console.log(isAverage
        ? `Average of ${numbers.join(", ")} = ${result}`
        : formatResult(numbers, selected.symbol, result));
}

main();
