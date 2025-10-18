import Calculator from '../src/calculator/Calculator.js';
import {
  BANNED_CUSTOM_SEPARATOR,
  INVALID_CUSTOM_SEPARATOR_LENGTH,
  TOO_MANY_CUSTOM_SEPARATORS,
  WRONG_EXPRESSION,
  RESULT_OVERFLOW,
} from '../src/const/errorMessages.js';
import { MAX_CUSTOM_SEPARATOR_LENGTH, MAX_RESULT_SAFE_INTEGER } from '../src/const/limits.js';

describe('Calculator 테스트', () => {
  test('커스텀 구분자 저장하고 불러오기', async () => {
    const input = ['a ', ' ', ' *', '    '];
    const output = new Set(input);

    const calculator = new Calculator();
    input.forEach((e) => calculator.addCustomSeparator(e));

    expect(calculator.getCustomSeparators()).toEqual(output);
  });

  test('// 포함한 커스텀 구분자 저장시 에러 발생', async () => {
    const input = '//r';

    const calculator = new Calculator();

    expect(() => calculator.addCustomSeparator(input)).toThrow(BANNED_CUSTOM_SEPARATOR);
  });

  test('\\n 포함한 커스텀 구분자 저장시 에러 발생', async () => {
    const input = '\\n';

    const calculator = new Calculator();

    expect(() => calculator.addCustomSeparator(input)).toThrow(BANNED_CUSTOM_SEPARATOR);
  });

  test('숫자 포함한 커스텀 구분자 저장시 에러', async () => {
    const input = 'a3a';

    const calculator = new Calculator();

    expect(() => calculator.addCustomSeparator(input)).toThrow(BANNED_CUSTOM_SEPARATOR);
  });

  test('최대길이 보다 큰 커스텀 구분자 저장시 에러 발생', async () => {
    const input = 'a'.repeat(MAX_CUSTOM_SEPARATOR_LENGTH + 1);

    const calculator = new Calculator();

    expect(() => calculator.addCustomSeparator(input)).toThrow(INVALID_CUSTOM_SEPARATOR_LENGTH);
  });

  test('최대갯수 보다 많은 커스텀 구분자 저장시 에러 발생', async () => {
    const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    const calculator = new Calculator();
    input.forEach((e) => calculator.addCustomSeparator(e));

    expect(() => calculator.addCustomSeparator('k')).toThrow(TOO_MANY_CUSTOM_SEPARATORS);
  });

  test('계산식 저장하고 불러오기', async () => {
    const input = '1,2:3,4,5';

    const calculator = new Calculator();
    calculator.setExpression(input);

    expect(calculator.getExpression()).toBe(input);
  });

  test('계산식에 다른 문자가 있는 경우 에러 발생', async () => {
    const input = '1,2 3,4,5';

    const calculator = new Calculator();

    expect(() => calculator.setExpression(input)).toThrow(WRONG_EXPRESSION);
  });

  test('계산식에 숫자가 없는 경우 에러 발생', async () => {
    const input = ',:,:,,,,,,,,,,';

    const calculator = new Calculator();

    expect(() => calculator.setExpression(input)).toThrow(WRONG_EXPRESSION);
  });

  test('일반 계산', async () => {
    const input = '123,123,123';
    const output = 123 + 123 + 123;

    const calculator = new Calculator();
    calculator.setExpression(input);

    expect(calculator.sumExpression()).toBe(output);
  });

  test('결과 값이 너무 큰 경우 에러 발생', async () => {
    const input = `123,123,${MAX_RESULT_SAFE_INTEGER}`;

    const calculator = new Calculator();
    calculator.setExpression(input);

    expect(() => calculator.sumExpression()).toThrow(RESULT_OVERFLOW);
  });
});
