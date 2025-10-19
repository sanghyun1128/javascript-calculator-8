import DEFAULT_SEPARATORS from '../const/defaultSeparators.js';
import StringUtils from '../string/StringUtils.js';
import Validator from '../validation/Validator.js';

export default class Calculator {
  constructor() {
    this.customSeparators = new Set();
    this.expression = null;
  }

  addCustomSeparator(separator) {
    Validator.validateAmountOfCustomSeparator(this.customSeparators.size);
    Validator.validateForbiddenWordsInCustomSeparator(separator);
    Validator.validateCustomSeparatorLength(separator);

    this.customSeparators.add(separator);
  }

  getCustomSeparators() {
    return this.customSeparators;
  }

  setExpression(expression) {
    const separators = this.customSeparators.union(DEFAULT_SEPARATORS);

    Validator.validateExpressionCanBeEvaluated(expression, separators);

    this.expression = expression;
  }

  getExpression() {
    return this.expression;
  }

  sumExpression() {
    const separators = this.customSeparators.union(DEFAULT_SEPARATORS);
    const regEx = StringUtils.getSplitRegEx(separators);
    const numberArray = this.expression.split(regEx);

    const result = numberArray
      .map((n) => +n)
      .reduce((acc, n) => {
        Validator.validateSafeToAddPositives(acc, n);
        return acc + n;
      }, 0);

    return result;
  }
}
