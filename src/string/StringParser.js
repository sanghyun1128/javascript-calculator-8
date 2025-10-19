import DEFAULT_SEPARATORS from '../const/defaultSeparators.js';
import StringUtils from './StringUtils.js';
import Validator from '../validation/Validator.js';

export default class StringParser {
  static extractCustomSeparatorDeclaration(rawInput) {
    let customSeparatorDeclaration = '';

    const startIndex = rawInput.indexOf('//');
    const endIndex = rawInput.lastIndexOf('\\n');

    Validator.validateCustomSeparatorDeclarationFormat(rawInput);

    if (startIndex !== -1 && endIndex !== -1) {
      customSeparatorDeclaration = rawInput.substring(startIndex + 2, endIndex);
    }

    return customSeparatorDeclaration;
  }

  static extractExpression(rawInput) {
    let expression;

    const startIndex = rawInput.lastIndexOf('\\n');
    if (startIndex === -1) expression = rawInput;
    else expression = rawInput.substring(startIndex + 2).trim();

    Validator.validateExpressionNotEmpty(expression);

    return expression;
  }

  static extractCustomSeparatorSet(customSeparatorDeclaration) {
    const splitRegEx = StringUtils.getSplitRegEx(DEFAULT_SEPARATORS);

    const customSeparatorSet = new Set();
    customSeparatorDeclaration.split(splitRegEx).forEach((e) => customSeparatorSet.add(e));

    return customSeparatorSet;
  }
}
