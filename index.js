let expression = "";

//working on clicking buttons
document.querySelectorAll("td").forEach((btn) => {
  btn.addEventListener("click", function () {
    let button = this.innerHTML.trim();
    algebraicExpressions(button);
    buttonAnimation(button);
  });
});

//working with keyboard buttons
document.addEventListener("keydown", function (event) {
  let key = event.key;
  algebraicExpressions(key);
  buttonAnimation(key);
});

function algebraicExpressions(key) {
  if (!isNaN(key) || key === ".") {
    // Digits or decimal
    expression += key;
    document.querySelector("th").innerHTML = expression;

  } else if (["+", "-", "x", "*", "÷", "/", "%"].includes(key)) {
    let op = key === "x" ? "*" :
             key === "÷" ? "/" :
             key;

    // Prevent duplicate operators
    if (expression.trim().endsWith("+") ||
        expression.trim().endsWith("-") ||
        expression.trim().endsWith("*") ||
        expression.trim().endsWith("/") ||
        expression.trim().endsWith("%")) {
      return;
    }

    expression += ` ${op} `;
    document.querySelector("th").innerHTML = expression
      .replace(/\*/g, "×")
      .replace(/\//g, "÷")
      .replace(/%/g, "%");

  } else if (key === "=" || key === "Enter") {
    let trimmedExp = expression.trim();
    let lastChar = trimmedExp[trimmedExp.length - 1];

    // Prevent evaluation if expression ends with operator
    if (["+", "-", "*", "/", "%", "."].includes(lastChar)) {
      document.querySelector("th").innerHTML = "Invalid";
      return;
    }

    // Prevent invalid single-sided modulus (like "25 %")
    if (trimmedExp.includes("%")) {
      let parts = trimmedExp.split("%");
      if (parts.length === 2 && parts[1].trim() === "") {
        document.querySelector("th").innerHTML = "Invalid";
        return;
      }
    }

    try {
      let result = eval(trimmedExp);
      document.querySelector("th").innerHTML = result;
      expression = result.toString();
    } catch (e) {
      document.querySelector("th").innerHTML = "Error";
      expression = "";
    }

  } else if (key === "AC" || key === "C" || key === "Escape") {
    // Clear all
    expression = "";
    document.querySelector("th").innerHTML = "0";

  } else if (key === "CE" || key === "Backspace") {
    // Remove last token
    let tokens = expression.trim().split(" ");
    tokens.pop();
    expression = tokens.join(" ");
    document.querySelector("th").innerHTML = expression || "0";
  }
}

function convertKey(key) {
  switch (key) {
    case "*": return "x";
    case "/": return "÷";
    case "Enter": return "=";
    case "Backspace": return "CE";
    case "Escape": return "AC";
    default: return key;
  }
}

//animation of each button
function buttonAnimation(currentKey) {
  document.querySelectorAll("td").forEach((btn) => {
    let btnText = btn.innerHTML.trim();
    
    if (btnText === currentKey || convertKey(currentKey) === btnText) {
      btn.classList.add("pressed");
      setTimeout(() => {
        btn.classList.remove("pressed");
      }, 100);
    }
  });
}
