const result = document.getElementById("result");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll("button");

let currentExp = "";

function isValidExpression(exp) {
  const lastChar = exp[exp.length - 1];
  const validEnd = /[0-9)]/;
  return validEnd.test(lastChar);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    switch (value) {
      case "AC":
        currentExp = "";
        result.innerText = "0";
        expression.innerText = "";
        break;

      case "⌫":
        currentExp = currentExp.slice(0, -1);
        expression.innerText = currentExp;
        break;

      case "=":
        try {
          if (!isValidExpression(currentExp)) {
            result.innerText = "Invalid Expression";
            return;
          }
          let evalExp = currentExp.replace(/%/g, "/100");
          const evalResult = Function('"use strict";return (' + evalExp + ')')();

          if (!isFinite(evalResult)) {
            result.innerText = "Math Error";
            return;
          }

          result.innerText = evalResult;
          expression.innerText = currentExp;
          currentExp = evalResult.toString();
        } catch (e) {
          result.innerText = "Syntax Error";
        }
        break;

      default:
        const operators = "+-*/%";
        const lastChar = currentExp.slice(-1);
        if (operators.includes(lastChar) && operators.includes(value)) {
          return;
        }

        currentExp += value;
        expression.innerText = currentExp;
    }
  });
});
