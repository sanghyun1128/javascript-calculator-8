import { Console } from '@woowacourse/mission-utils';

import {
  ERROR_PREFIX,
  PREFIX_CONTENT_SEPARATOR,
  PROMPT_ENTER_ADDITION,
  RESULT_PREFIX,
} from '../const/messages.js';
import { ZERO_INPUT, LONG_INPUT } from '../const/errorMessages.js';
import { MAX_INPUT_BYTE } from '../const/limits.js';

export default class IOManager {
  static async getUserInput() {
    let userInput = await Console.readLineAsync(PROMPT_ENTER_ADDITION);
    userInput = userInput.trim();

    if (userInput.length === 0) throw new Error(ZERO_INPUT);
    if (Buffer.byteLength(userInput, 'utf8') > MAX_INPUT_BYTE) throw new Error(LONG_INPUT);

    return userInput;
  }

  static printResult(message) {
    Console.print(`${RESULT_PREFIX}${PREFIX_CONTENT_SEPARATOR}${message}`);
  }

  static printError(message) {
    Console.print(`${ERROR_PREFIX}${PREFIX_CONTENT_SEPARATOR}${message}`);
  }
}
