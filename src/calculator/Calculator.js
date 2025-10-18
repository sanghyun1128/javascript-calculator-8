import {
  BANNED_CUSTOM_SEPARATOR,
  INVALID_CUSTOM_SEPARATOR_LENGTH,
  TOO_MANY_CUSTOM_SEPARATORS,
  RESULT_OVERFLOW,
  WRONG_EXPRESSION,
  MINUS_IS_NOT_ALLOWED,
  INVALID_SIGNIFICANT_DIGITS,
} from '../const/errorMessages.js';
import {
  MAX_CUSTOM_SEPARATOR_COUNT,
  MAX_CUSTOM_SEPARATOR_LENGTH,
  MAX_RESULT_SAFE_INTEGER,
  MAX_SIGNIFICANT_DIGITS,
} from '../const/limits.js';
import DEFAULT_SEPARATORS from '../const/defaultSeparators.js';
import StringUtils from '../string/StringUtils.js';

export default class Calculator {
  constructor() {
    this.customSeparators = new Set();
    this.expression = null;
  }

  addCustomSeparator(separator) {
    if (this.customSeparators.size >= MAX_CUSTOM_SEPARATOR_COUNT)
      throw new Error(TOO_MANY_CUSTOM_SEPARATORS);

    if (
      separator.includes('//') ||
      separator.includes('\\n') ||
      separator.includes('-') ||
      separator.includes('.') ||
      /\d/.test(separator)
    )
      throw new Error(BANNED_CUSTOM_SEPARATOR);

    if (separator.length > MAX_CUSTOM_SEPARATOR_LENGTH)
      throw new Error(INVALID_CUSTOM_SEPARATOR_LENGTH);

    this.customSeparators.add(separator);
  }

  getCustomSeparators() {
    return this.customSeparators;
  }

  setExpression(expression) {
    const separators = this.customSeparators.union(DEFAULT_SEPARATORS);
    const regEx = StringUtils.getSplitRegEx(separators);

    expression.split(regEx).forEach((e) => {
      if (e === '' || Number.isNaN(+e)) throw new Error(WRONG_EXPRESSION);
      if (+e < 0) throw new Error(MINUS_IS_NOT_ALLOWED);
      if (e.length > MAX_SIGNIFICANT_DIGITS) throw new Error(INVALID_SIGNIFICANT_DIGITS);
    });

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
        if (acc + n <= MAX_RESULT_SAFE_INTEGER) return acc + n;
        throw new Error(RESULT_OVERFLOW);
      }, 0);

    return result;
  }
}
