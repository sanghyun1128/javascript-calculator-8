import Calculator from './calculator/Calculator.js';
import IOManager from './io/IOManager.js';
import StringParser from './string/StringParser.js';

class App {
  async run() {
    try {
      const calculator = new Calculator();
      const userInput = await IOManager.getUserInput();

      const customSeparatorDeclaration = StringParser.extractCustomSeparatorDeclaration(userInput);
      const customSeparatorSet = StringParser.extractCustomSeparatorSet(customSeparatorDeclaration);
      customSeparatorSet.forEach((e) => calculator.addCustomSeparator(e));
      calculator.setExpression(StringParser.extractExpression(userInput));

      IOManager.printResult(calculator.sumExpression());
    } catch (error) {
      error.message = IOManager.getFullErrorMessage(error.message);
      throw error;
    }
  }
}

export default App;
