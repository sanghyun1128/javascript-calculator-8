import { Console } from '@woowacourse/mission-utils';

import {
  ERROR_PREFIX,
  PREFIX_CONTENT_SEPARATOR,
  PROMPT_ENTER_ADDITION,
  RESULT_PREFIX,
} from '../const/messages.js';
import Validator from '../validation/Validator.js';

export default class IOManager {
  static async getUserInput() {
    let userInput = await Console.readLineAsync(PROMPT_ENTER_ADDITION);
    userInput = userInput.trim();

    Validator.validateUserInputLength(userInput);

    return userInput;
  }

  static printResult(message) {
    Console.print(`${RESULT_PREFIX}${PREFIX_CONTENT_SEPARATOR}${message}`);
  }

  static getFullErrorMessage(message) {
    const fullErrorMessage = `${ERROR_PREFIX}${PREFIX_CONTENT_SEPARATOR}${message}`;
    return fullErrorMessage;
  }
}
