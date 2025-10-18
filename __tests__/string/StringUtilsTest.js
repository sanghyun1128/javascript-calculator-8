import StringUtils from '../../src/string/StringUtils.js';

describe('StringUtils 테스트', () => {
  test('빈 Set으로 RegEx 만드는 경우', async () => {
    const input = new Set();
    const string = 'abc';
    const output = ['abc'];

    const result = StringUtils.getSplitRegEx(input);

    expect(string.split(result)).toEqual(output);
  });

  test('공백을 포함해 RegEx 만드는 경우', async () => {
    const input = new Set(['   ']);
    const string = 'a   b c';
    const output = ['a', 'b', 'c'];

    const result = StringUtils.getSplitRegEx(input);

    expect(string.split(result)).toEqual(output);
  });

  test('특수문자를 포함해 RegEx 만드는 경우', async () => {
    const input = new Set(['.', '^']);
    const string = 'a.b^c';
    const output = ['a', 'b', 'c'];

    const result = StringUtils.getSplitRegEx(input);

    expect(string.split(result)).toEqual(output);
  });

  test('단어 포함해 RegEx 만드는 경우', async () => {
    const input = new Set([' a b']);
    const string = '1 a b2 a b3';
    const output = ['1', '2', '3'];

    const result = StringUtils.getSplitRegEx(input);

    expect(string.split(result)).toEqual(output);
  });

  test('대소문자 포함해 RegEx 만드는 경우', async () => {
    const input = new Set(['Ab']);
    const string = '1ab2ab3';
    const output = ['1ab2ab3'];

    const result = StringUtils.getSplitRegEx(input);

    expect(string.split(result)).toEqual(output);
  });

  test('겹치는 부분이 있는 단어로 RegEx 만드는 경우', async () => {
    const input = new Set(['a', 'aa']);
    const string = '1aa2a3';
    const output = ['1', '2', '3'];

    const result = StringUtils.getSplitRegEx(input);

    expect(string.split(result)).toEqual(output);
  });
});
