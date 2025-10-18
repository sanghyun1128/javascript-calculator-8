export default class StringUtils {
  /**
   * 구분자 Set을 받아 String.split()에 사용할 정규표현식을 반환합니다.
   *
   * 동작 및 제약:
   * - separatorSet이 비어 있으면 절대 매칭되지 않는 정규식(/$^/)을 반환합니다.
   * - 구분자들을 길이 내림차순으로 정렬해 긴 구분자가 먼저 매칭되도록 합니다.
   * - 공백(' ') 구분자는 연속 공백(\s+)으로 처리합니다.
   * - 그 외 구분자는 정규식 특수문자를 이스케이프하여 리터럴로 매칭되게 합니다.
   *
   * @param {Set<string>} separatorSet - 구분자 Set
   * @returns {RegExp} String.split()에 사용할 정규식
   */
  static getSplitRegEx(separatorSet) {
    if (separatorSet.size === 0) return /$^/;

    const separatorArr = Array.from(separatorSet);

    const escapeForRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    separatorArr.sort((a, b) => b.length - a.length);

    const patterns = separatorArr.map((s) => {
      if (s.trim().length === 0) return '\\s+';
      return escapeForRegExp(s);
    });

    return new RegExp(patterns.join('|'));
  }
}
