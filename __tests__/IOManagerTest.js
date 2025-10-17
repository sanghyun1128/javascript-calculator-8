import { MissionUtils } from '@woowacourse/mission-utils';

import IOManager from '../src/io/IOManager.js';
import { ERROR_PREFIX, PREFIX_CONTENT_SEPARATOR, RESULT_PREFIX } from '../src/const/messages.js';
import { LONG_INPUT, ZERO_INPUT } from '../src/const/errorMessages.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('IOManager 테스트', () => {
  test('입력 테스트', async () => {
    const input = '//;\\n1';
    mockQuestions([input]);

    await expect(IOManager.getUserInput()).resolves.toBe(input);
  });

  test('앞 뒤 공백 있을때 입력 테스트', async () => {
    const input = ' //;\\n1 ';
    const output = '//;\\n1';
    mockQuestions([input]);

    await expect(IOManager.getUserInput()).resolves.toBe(output);
  });

  test('결과 출력 테스트', async () => {
    const input = 'result';
    const output = `${RESULT_PREFIX}${PREFIX_CONTENT_SEPARATOR}${input}`;

    const logSpy = getLogSpy();
    IOManager.printResult(input);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });

  test('에러 출력 테스트', async () => {
    const input = 'error';
    const output = `${ERROR_PREFIX}${PREFIX_CONTENT_SEPARATOR}${input}`;

    const logSpy = getLogSpy();
    IOManager.printError(input);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });

  test('입력 없을 경우 에러 발생', async () => {
    const input = '';
    mockQuestions([input]);

    await expect(IOManager.getUserInput()).rejects.toThrow(ZERO_INPUT);
  });

  test('입력 길이 경계 테스트 허용(10000바이트)', async () => {
    const input = 'a'.repeat(10000);

    expect(Buffer.byteLength(input, 'utf8')).toBe(10000);

    mockQuestions([input]);

    await expect(IOManager.getUserInput()).resolves.toBe(input);
  });

  test('입력 길이 경계 테스트 초과(10001바이트) 에러 발생', async () => {
    const input = 'a'.repeat(10001);

    expect(Buffer.byteLength(input, 'utf8')).toBeGreaterThan(10000);

    mockQuestions([input]);

    await expect(IOManager.getUserInput()).rejects.toThrow(LONG_INPUT);
  });
});
