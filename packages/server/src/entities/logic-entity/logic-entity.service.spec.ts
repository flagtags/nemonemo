import { HintCalculatorEntity } from '@entities/hint-calculator-entity/hint-calculator-entity';
import { LogicEntity } from './logic-entity.service';

describe('로직 생성 테스트', () => {
  test('일반적인 로직 생성', () => {
    const logicEntity = {
      answer: [
        [true, false, true, true],
        [false, false, true, true],
        [false, false, true, true],
        [false, false, true, true],
      ],
      timeLimit: 10,
      title: 'test',
      authorId: 'kkirico',
    };

    const logic = new LogicEntity(logicEntity);
    const { row: testHintRow, column: testHintColumn } =
      HintCalculatorEntity.getHints(logicEntity.answer);
    const testLogicEntity = {
      answer: [
        [true, false, true, true],
        [false, false, true, true],
        [false, false, true, true],
        [false, false, true, true],
      ],
      timeLimit: 10,
      title: 'test',
      authorId: 'kkirico',
      hintRow: testHintRow,
      hintColumn: testHintColumn,
      size: logicEntity.answer.length,
    };

    expect({ ...logic }).toEqual(testLogicEntity);
  });
});
