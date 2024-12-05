export default class Calculation {
  constructor(expression) {
    this.expression = expression;
  }

  calculate() {
    // Schritt 1: Eingabe validieren
    if (!this.isValidExpression(this.expression)) {
      return undefined;
    }

    try {
      // Schritt 2: Bereinigen und Auswerten
      const sanitizedExpression = this.sanitizeExpression(this.expression);
      const result = this.evaluateExpression(sanitizedExpression);
      return result;
    } catch (error) {
      // Schritt 3: Fehler abfangen
      console.error("Fehler bei der Berechnung:", error);
      return undefined;
    }
  }

  // Überprüft, ob der Ausdruck gültige Zeichen enthält
  isValidExpression(expression) {
    const validPattern = /^[\d+\-*/().\s]+$/; // Only valid characters
    const invalidSpaces = /\d\s+\d/; // Detect spaces between numbers
    return validPattern.test(expression) && !invalidSpaces.test(expression);
  }


  // Entfernt unnötige Leerzeichen aus dem Ausdruck
  sanitizeExpression(expression) {
    return expression.replace(/\s+/g, ""); // Alle Leerzeichen entfernen
  }

  // Hauptlogik für die Evaluierung des Ausdrucks
  evaluateExpression(expression) {
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => (b === 0 ? undefined : a / b),
    };

    // Tokenisierung
    const tokens = this.tokenize(expression);

    // Umwandlung in Postfix-Notation
    const postfix = this.toPostfix(tokens);

    // Auswertung der Postfix-Notation
    return this.evaluatePostfix(postfix, operators);
  }

  // Zerlegt den Ausdruck in Zahlen und Operatoren
  tokenize(expression) {
    const regex = /(\d+(\.\d+)?)|([+\-*/()])/g;
    return expression.match(regex);
  }

  // Konvertiert einen Infix-Ausdruck in Postfix (Shunting-Yard-Algorithmus)
  toPostfix(tokens) {
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const output = [];
    const operators = [];

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        output.push(parseFloat(token));
      } else if (token in precedence) {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          output.push(operators.pop());
        }
        operators.pop(); // Entfernt "("
      }
    });

    while (operators.length) {
      output.push(operators.pop());
    }

    return output;
  }

  // Führt die Berechnung der Postfix-Notation aus
  evaluatePostfix(postfix, operators) {
    const stack = [];

    postfix.forEach((token) => {
      if (!isNaN(token)) {
        stack.push(token);
      } else if (token in operators) {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(operators[token](a, b));
      }
    });

    return stack.pop();
  }
}
