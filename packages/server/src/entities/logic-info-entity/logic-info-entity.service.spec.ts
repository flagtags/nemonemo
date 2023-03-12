import { LogicInfoEntityDto } from '@dto/logicInfo/logic-info-entity.dto';
import { LogicInfoEntity } from './logic-info-entity.service';

describe('Logic info entity', () => {
  test('solved logic 업데이트', () => {
    const logicInfoEntityDto = {
      logicId: '1',
      views: 1,
      solvedCount: 2,
      likes: 3,
      averageSolvedTimeMs: 100000,
      bestSolvedTimeMs: 60000,
    };

    const solvedLogic = {
      logicId: 'asdfasdf',
      userId: 'adntge',
      solvedTimeMs: 40000,
    };
    const logicInfoEntity = new LogicInfoEntity(logicInfoEntityDto);
    logicInfoEntity.addSolvedLogic(solvedLogic);

    expect(logicInfoEntity.averageSolvedTimeMs).toBe(80000);
    expect(logicInfoEntity.solvedCount).toBe(3);
    expect(logicInfoEntity.bestSolvedTimeMs).toBe(40000);
  });
});
