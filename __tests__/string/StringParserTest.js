import StringParser from '../../src/string/StringParser.js';
import { EMPTY_EXPRESSION } from '../../src/const/errorMessages.js';

describe('StringParser 테스트', () => {
  test('계산식만 있을 경우 계산식 추출', async () => {
    const input = '123,432,23,2';
    const output = '123,432,23,2';

    const result = StringParser.extractExpression(input);

    expect(result).toBe(output);
  });

  test('커스텀 구분자랑 같이 있을 경우 계산식 추출', async () => {
    const input = '//#\\n123,123#123';
    const output = '123,123#123';

    const result = StringParser.extractExpression(input);

    expect(result).toBe(output);
  });

  test('계산식이 비어 있을 경우 에러 처리', async () => {
    const input = '//#\\n ';

    expect(() => StringParser.extractExpression(input)).toThrow(EMPTY_EXPRESSION);
  });

  test('계산식 앞 뒤에 공백이 있는 경우', async () => {
    const input = '//#\\n 123,123#123 ';
    const output = '123,123#123';

    const result = StringParser.extractExpression(input);

    expect(result).toBe(output);
  });

  test('계산식 안에 연속된 공백이 있는 경우', async () => {
    const input = '// \\n123  123      123';
    const output = '123  123      123';

    const result = StringParser.extractExpression(input);

    expect(result).toBe(output);
  });

  test('커스텀 구분자 구문 추출', async () => {
    const input = '//#\\n123,123#123';
    const output = '#';

    const result = StringParser.extractCustomSeparatorDeclaration(input);

    expect(result).toBe(output);
  });

  test('커스텀 구분자 구문이 없을 경우', async () => {
    const input = '123,123,123';
    const output = '';

    const result = StringParser.extractCustomSeparatorDeclaration(input);

    expect(result).toBe(output);
  });

  test('커스텀 구분자를 중복으로 감쌌을 경우', async () => {
    const input = '//$\\n123,\\n123#123';
    const output = '$\\n123,';

    const result = StringParser.extractCustomSeparatorDeclaration(input);

    expect(result).toBe(output);
  });

  test('커스텀 구분자로 공백을 쓰려는 경우', async () => {
    const input = ' ';
    const output = [' '];

    const result = StringParser.extractCustomSeparatorSet(input);

    output.forEach((e) => {
      expect(result).toContain(e);
    });
  });

  test('여러개의 커스텀 구분자를 포함하려는 경우', async () => {
    const input = ' ,#:+ ';
    const output = [' ', '#', '+ '];

    const result = StringParser.extractCustomSeparatorSet(input);

    output.forEach((e) => {
      expect(result).toContain(e);
    });
  });
});
