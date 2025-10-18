# javascript-calculator-precourse

## 요구사항

- 쉼표(,) 또는 콜론(:)을 구분자로 가지는 문자열을 전달하는 경우 구분자를 기준으로 분리한 각 숫자의 합을 반환한다.

- 앞의 기본 구분자(쉼표, 콜론) 외에 커스텀 구분자를 지정할 수 있다. 커스텀 구분자는 문자열 앞부분의 "//"와 "\n" 사이에 위치하는 문자를 커스텀 구분자로 사용한다.

- 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시킨 후 애플리케이션은 종료되어야 한다.

## 구현할 기능 목록

- eslint, prettier 설정

- 전체적인 구조 설계

- 메시지, 제한값, 기본값 등을 상수 변수화 해서 관리

- [`class IOManger`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/io/IOManager.js) 구현 및 테스트 케이스 추가
  - 입력 크기 관련 제한

- [`class StringUtils`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/string/StringUtils.js) 구현 및 테스트 케이스 추가

- [`class StringParser`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/string/StringParser.js) 구현 및 테스트 케이스 추가
  - 커스텀 구분자 구문 규칙, 계산식 존재 여부 관련 제한

- [`class Calculator`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/calculator/Calculator.js) 구현 및 테스트 케이스 추가
  - 기본 구분자(' , ' , ' : ')를 이용해 여러개의 커스텀 구분자 추가 지원 (길이 및 갯수 제한)
  - 허용되는 커스텀 구분자와 계산 가능한 계산식 관련 제한

- 음수관련 에러 처리와 소수점 정수 덧셈 지원
  - 소수점 자리수 제한

- [`class App`](https://github.com/sanghyun1128/javascript-calculator-8/tree/sanghyun1128/src/App.js) 메인 로직 구현

- 리팩토링
  - 검증관련 로직들 분리해서 [`class Validator`](https://github.com/sanghyun1128/javascript-calculator-8/tree/sanghyun1128/src/validation/Validator.js) 로 모아서 처리

## 전체적인 구조 및 작동 방식

- 상수들을 관리하기 위해 [`const`](https://github.com/sanghyun1128/javascript-calculator-8/tree/sanghyun1128/src/const) 폴더 생성
  - 화면에 표시될 메시지들 `messages.js`
  - 에러시에 표시될 메시지들 `errorMessages.js`
  - 기본 구분자를 지정할 `defaultSeparators.js`
  - 각종 제한에 관련된 `limits.js`

- 전체적인 흐름을 컨트롤 하는 [`class App`](https://github.com/sanghyun1128/javascript-calculator-8/tree/sanghyun1128/src/App.js)
  - `IOManager`로 유저 입력 받아 지역 변수에 저장하기
  - `StringParser`로 구분자, 문자열 추출해 `Calculator`에 저장하기
  - `Calculator`에서 계산한값 가져와서 `IOManager`로 보여준 후 종료
  - 예외처리
    - 에러 발생시 `IOManager`로 에러메시지 생성
    - `error.message`에 값 할당
    - `throw`

- 입출력을 관리하는 [`class IOManger`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/io/IOManager.js)
  - 사용자로 부터 입력 받기
    - 예외처리
      - 빈 입력이 들어 왔을 때
      - `MAX_INPUT_BYTE` 보다 큰 입력이 들어 왔을 떄
  - 계산된 결과를 보여주기
  - 에러가 발생할때 보여줄 에러 메세지 생성하기

- 문자열을 파싱하는 [`class StringParser`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/string/StringParser.js)
  - 문자열에서 커스텀 구분자 구문을 추출
    - 존재하지 않으면 '' 반환
    - 예외처리
      - 시작이 '//' 일 때 '\n'이 존재 하지 않을 경우

  - 문자열에서 계산식을 추출
    - 앞, 뒤 공백 제거
    - 예외처리
      - 계산식이 비어 있을 경우

  - 커스텀 구분자 구문에서 커스텀 구분자들을 추출
    - 쉼표(,) 또는 콜론(:)을 이용해서 커스텀 구분자 여러개 추가 가능
    - 공백(' ')도 구분자로 인정, 길이 상관하지 않음

- 문자열 관련 기능 함수들이 있는 [`class StringUtils`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/string/StringUtils.js)
  - `String.split()` 에서 사용할 정규표현식 반환
    - 길이가 긴 구분자 먼저 매칭하도록 정렬
    - 모든 공백(' ')은 연속 공백('\s+')로 변환
    - 비어있을 경우 `String.split()` 동작을 위해 '/$^/' 반환

- 데이터를 저장하고 계산하는 [`class Calculator`](https://github.com/sanghyun1128/javascript-calculator-8/blob/sanghyun1128/src/calculator/Calculator.js)
  - 커스텀 구분자 저장해둘 변수 `this.customSeparator = new Set()`
  - 계산식 저장해둘 변수 `this.expression`

  - 커스텀 구분자 저장하기
    - 예외처리
      - 구분자에 '//', '\n', '-', '.', 숫자가 포함될 경우
      - 구분자의 길이 `MAX_CUSTOM_SEPARATOR_LENGTH` 보다 클 경우
      - 커스텀 구분자의 갯수가 `MAX_CUSTOM_SEPARATOR_COUNT` 보다 클 경우
  - 계산식 저장하기
    - 예외처리
      - 숫자, 기본 구분자, 커스텀 구분자 외에 다른 문자가 있을 경우
      - 숫자가 존재하지 않을 경우
      - 구분자가 연속으로 있을 경우
      - 음수가 있을 경우
      - 숫자의 길이가 `MAX_SIGNIFICANT_DIGITS` 보다 클 경우
  - 계산식과 구분자를 이용해서 계산하는 함수
    - 예외처리
      - 음수가 존재 할 경우
      - 결과의 크기가 `MAX_RESULT_SAFE_INTEGER` 보다 클 경우
