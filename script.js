// =========================
// Professional Calculator
// =========================

const screen = document.getElementById("screen");

// Append value
function append(value) {
    screen.value += value;
}

// Clear Screen
function clearScreen() {
    screen.value = "";
}

// Delete Last Character
function deleteLast() {
    screen.value = screen.value.slice(0, -1);
}

// Calculate Result
function calculate() {
    try {
        let expression = screen.value;

        // Convert percentage
        expression = expression.replace(/%/g, "/100");

        let result = eval(expression);

        if (result === Infinity || result === -Infinity) {
            screen.value = "Cannot divide by 0";
            return;
        }

        if (isNaN(result)) {
            screen.value = "Error";
            return;
        }

        screen.value = result;
    } catch (error) {
        screen.value = "Error";
    }
}

// =========================
// Keyboard Support
// =========================

document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        append(key);
    }

    // Operators
    if (["+", "-", "*", "/", "."].includes(key)) {
        append(key);
    }

    // Percentage
    if (key === "%") {
        append("%");
    }

    // Enter
    if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    if (key === "Escape") {
        clearScreen();
    }
});

// =========================
// Prevent Multiple Operators
// =========================

const operators = ["+", "-", "*", "/", "%"];

function append(value) {

    const last = screen.value.slice(-1);

    if (
        operators.includes(last) &&
        operators.includes(value)
    ) {
        return;
    }

    screen.value += value;
}

// =========================
// Auto Clear Error
// =========================

screen.addEventListener("click", () => {

    if (
        screen.value === "Error" ||
        screen.value === "Cannot divide by 0"
    ) {
        screen.value = "";
    }

});

// =========================
// Console Message
// =========================

console.log("Professional Calculator Loaded Successfully");