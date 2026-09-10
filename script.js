// ---------- State ----------
let currentValue = "0";
let previousValue = null;
let operator = null;
let resetOnNextInput = false;

const outputEl = document.getElementById("output");
const expressionEl = document.getElementById("expression");

function updateDisplay() {
  outputEl.textContent = currentValue;
  expressionEl.textContent = operator && previousValue !== null
    ? `${previousValue} ${operatorSymbol(operator)}`
    : "";
}

function operatorSymbol(op) {
  return { add: "+", subtract: "−", multiply: "×", divide: "÷" }[op] || "";
}

function inputNumber(num) {
  if (currentValue === "Error") currentValue = "0";
  if (resetOnNextInput) { currentValue = num; resetOnNextInput = false; }
  else currentValue = currentValue === "0" ? num : currentValue + num;
  updateDisplay();
}

function inputDecimal() {
  if (currentValue === "Error") currentValue = "0";
  if (resetOnNextInput) { currentValue = "0."; resetOnNextInput = false; updateDisplay(); return; }
  if (!currentValue.includes(".")) { currentValue += "."; updateDisplay(); }
}

function chooseOperator(nextOperator) {
  if (currentValue === "Error") return;
  if (operator && resetOnNextInput) { operator = nextOperator; updateDisplay(); return; }
  if (previousValue !== null) {
    const result = calculate(previousValue, currentValue, operator);
    if (result === null) { showError(); return; }
    currentValue = formatResult(result);
    previousValue = currentValue;
  } else previousValue = currentValue;
  operator = nextOperator;
  resetOnNextInput = true;
  updateDisplay();
}

function calculate(a, b, op) {
  const numA = parseFloat(a), numB = parseFloat(b);
  if (Number.isNaN(numA) || Number.isNaN(numB)) return null;
  switch (op) {
    case "add": return numA + numB;
    case "subtract": return numA - numB;
    case "multiply": return numA * numB;
    case "divide": return numB === 0 ? null : numA / numB;
    default: return numB;
  }
}

function formatResult(num) { return Number.isFinite(num) ? parseFloat(num.toFixed(10)).toString() : "Error"; }

function handleEquals() {
  if (currentValue === "Error" || operator === null || previousValue === null) return;
  const result = calculate(previousValue, currentValue, operator);
  if (result === null) { showError(); return; }
  currentValue = formatResult(result); previousValue = null; operator = null; resetOnNextInput = true; updateDisplay();
}

function handlePercent() { if (currentValue !== "Error") { const num = parseFloat(currentValue); if (!Number.isNaN(num)) { currentValue = formatResult(num / 100); updateDisplay(); } } }
function handleSign() { if (currentValue !== "Error" && currentValue !== "0") { currentValue = currentValue.startsWith("-") ? currentValue.slice(1) : `-${currentValue}`; updateDisplay(); } }
function handleBackspace() { if (currentValue === "Error" || resetOnNextInput) { currentValue = "0"; resetOnNextInput = false; } else currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0"; updateDisplay(); }
function handleClear() { currentValue = "0"; previousValue = null; operator = null; resetOnNextInput = false; updateDisplay(); }
function showError() { currentValue = "Error"; previousValue = null; operator = null; resetOnNextInput = true; updateDisplay(); }

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { value, action } = btn.dataset;
    if (value !== undefined) { value === "." ? inputDecimal() : inputNumber(value); return; }
    switch (action) {
      case "clear": handleClear(); break;
      case "backspace": handleBackspace(); break;
      case "sign": handleSign(); break;
      case "percent": handlePercent(); break;
      case "equals": handleEquals(); break;
      case "add": case "subtract": case "multiply": case "divide": chooseOperator(action); break;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
  else if (e.key === ".") inputDecimal();
  else if (e.key === "+") chooseOperator("add");
  else if (e.key === "-") chooseOperator("subtract");
  else if (e.key === "*") chooseOperator("multiply");
  else if (e.key === "/") { e.preventDefault(); chooseOperator("divide"); }
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); handleEquals(); }
  else if (e.key === "Backspace") handleBackspace();
  else if (e.key === "Escape") handleClear();
  else if (e.key === "%") handlePercent();
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("calc-theme");
if (savedTheme) { document.documentElement.setAttribute("data-theme", savedTheme); themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙"; }
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("calc-theme", newTheme);
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});

updateDisplay();
