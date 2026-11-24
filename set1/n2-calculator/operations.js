// Full Name: Sheriene Escano
// Section: IV-BSIT C
// Activity Code: N2
// Date: November 24, 2026

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    if (second === 0) {
        throw new RangeError("Cannot divide by zero.");
    }
    return first / second;
}

function average(...numbers) {
    return numbers.reduce((sum, number) => sum + number, 0) / numbers.length;
}

module.exports = { add, subtract, multiply, divide, average };
