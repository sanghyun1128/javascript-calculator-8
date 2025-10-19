import {
  ZERO_INPUT,
  LONG_INPUT,
  CUSTOM_SEPARATOR_NOT_WRAPPED,
  EMPTY_EXPRESSION,
  DO_NOT_USE_BANNED_CUSTOM_SEPARATOR,
  INVALID_CUSTOM_SEPARATOR_LENGTH,
  TOO_MANY_CUSTOM_SEPARATORS,
  WRONG_EXPRESSION,
  MINUS_IS_NOT_ALLOWED,
  INVALID_SIGNIFICANT_DIGITS,
  RESULT_OVERFLOW,
} from '../const/errorMessages.js';
import {
  MAX_INPUT_BYTE,
  MAX_CUSTOM_SEPARATOR_COUNT,
  MAX_CUSTOM_SEPARATOR_LENGTH,
  BANNED_CUSTOM_SEPARATORS,
  MAX_SIGNIFICANT_DIGITS,
  MAX_RESULT_SAFE_INTEGER,
} from '../const/limits.js';
import StringUtils from '../string/StringUtils.js';

export default class Validator {
  static validateUserInputLength(userInput) {
    if (userInput.length === 0) throw new Error(ZERO_INPUT);
    if (Buffer.byteLength(userInput, 'utf8') > MAX_INPUT_BYTE) throw new Error(LONG_INPUT);
  }

  static validateCustomSeparatorDeclarationFormat(startIndex, endIndex) {
    if (startIndex === 0 && endIndex === -1) throw new Error(CUSTOM_SEPARATOR_NOT_WRAPPED);
  }

  static validateExpressionNotEmpty(expression) {
    if (expression.length === 0) throw new Error(EMPTY_EXPRESSION);
  }

  static validateCustomSeparatorLength(separator) {
    if (separator.length > MAX_CUSTOM_SEPARATOR_LENGTH)
      throw new Error(INVALID_CUSTOM_SEPARATOR_LENGTH);
  }

  static validateAmountOfCustomSeparator(size) {
    if (size >= MAX_CUSTOM_SEPARATOR_COUNT) throw new Error(TOO_MANY_CUSTOM_SEPARATORS);
  }

  static validateForbiddenWordsInCustomSeparator(separator) {
    BANNED_CUSTOM_SEPARATORS.forEach((e) => {
      if (separator.includes(e)) throw new Error(DO_NOT_USE_BANNED_CUSTOM_SEPARATOR);
    });
  }

  static validateExpressionCanBeEvaluated(expression, separators) {
    const regEx = StringUtils.getSplitRegEx(separators);

    expression.split(regEx).forEach((e) => {
      if (e === '' || Number.isNaN(+e)) throw new Error(WRONG_EXPRESSION);
      if (+e < 0) throw new Error(MINUS_IS_NOT_ALLOWED);
      if (e.length > MAX_SIGNIFICANT_DIGITS) throw new Error(INVALID_SIGNIFICANT_DIGITS);
    });
  }

  static validateSafeToAddPositives(a, b) {
    if (a > MAX_RESULT_SAFE_INTEGER - b) throw new Error(RESULT_OVERFLOW);
  }
}
