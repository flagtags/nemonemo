import { Logic } from '@models/logic/logic.schema';
import { HintCalculatorEntity } from './hint-calculator-entity';

describe('정답 배열을 이용해서 힌트를 추출한다.', () => {
  test('스파스 로직 케이스', () => {
    const logic = [
      [true, false, true],
      [false, true, false],
      [true, false, true],
    ];

    const hintSolution = {
      row: [[1, 1], [1], [1, 1]],
      column: [[1, 1], [1], [1, 1]],
    };

    const hints = HintCalculatorEntity.getHints(logic);
    expect(hints).toEqual(hintSolution);
  });

  test('꽉 찬 로직 케이스', () => {
    const logic = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];

    const hintSolution = {
      row: [[3], [3], [3]],
      column: [[3], [3], [3]],
    };

    const hints = HintCalculatorEntity.getHints(logic);
    expect(hints).toEqual(hintSolution);
  });

  test('그냥 로직 케이스', () => {
    const logic = [
      [true, false, true, false, true],
      [true, true, false, false, true],
      [true, true, true, true, false],
      [true, true, false, true, true],
      [true, true, true, true, false],
    ];

    const hintSolution = {
      row: [[1, 1, 1], [2, 1], [4], [2, 2], [4]],
      column: [[5], [4], [1, 1, 1], [3], [2, 1]],
    };

    const hints = HintCalculatorEntity.getHints(logic);
    expect(hints).toEqual(hintSolution);
  });
});

describe('로직의 한 열을 힌트 배열로 바꾸는 함수 테스트', () => {
  test('일반 예시 테스트', () => {
    const row = [true, true, true, false, true, false, true];
    const hintOfRowSolution = [3, 1, 1];

    const hintOfRow = HintCalculatorEntity.splitSum(row);

    expect(hintOfRow).toEqual(hintOfRowSolution);
  });

  // 테스트 케이스에서 끝에 0
  // 전체 0이면 버그를 찾을 수 있었다.
  test('[0,1,0] 테스트', () => {
    const row = [false, true, false];
    const hintOfRowSolution = [1];

    const hintOfRow = HintCalculatorEntity.splitSum(row);

    expect(hintOfRow).toEqual(hintOfRowSolution);
  });
});
