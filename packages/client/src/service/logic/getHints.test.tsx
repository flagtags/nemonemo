import getHints, { splitSum } from './getHints';


describe('정답 배열을 이용해서 힌트를 추출한다.', () => {
  test('스파스 로직 케이스', () => {
    const logic = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];

    const hintSolution = {
      row: [[1, 1], [1], [1, 1]],
      column: [[1, 1], [1], [1, 1]],
    };

    const hints = getHints(logic);
    expect(hints).toEqual(hintSolution);
  });

  test('꽉 찬 로직 케이스', () => {
    const logic = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];

    const hintSolution = {
      row: [[3], [3], [3]],
      column: [[3], [3], [3]],
    };

    const hints = getHints(logic);
    expect(hints).toEqual(hintSolution);
  });

  test('그냥 로직 케이스', () => {
    const logic = [
      [1, 0, 1, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 0],
    ];

    const hintSolution = {
      row: [[1, 1, 1], [2,1], [4],[2,2],[4]],
      column: [[5], [4], [1, 1,1],[3],[2,1]],
    };

    const hints = getHints(logic);
    expect(hints).toEqual(hintSolution);
  });
});

describe('로직의 한 열을 힌트 배열로 바꾸는 함수 테스트', () => {
  test('일반 예시 테스트' ,() => {
    const row = [1, 1, 1, 0, 1, 0, 1];
    const hintOfRowSolution = [3,1,1];

    const hintOfRow = splitSum(row);

    expect(hintOfRow).toEqual(hintOfRowSolution);
  });

  // 테스트 케이스에서 끝에 0
  // 전체 0이면 버그를 찾을 수 있었다.
  test('[0,1,0] 테스트', () => {
    const row = [0,1,0];
    const hintOfRowSolution = [1];

    const hintOfRow = splitSum(row);

    expect(hintOfRow).toEqual(hintOfRowSolution);
  })

})
