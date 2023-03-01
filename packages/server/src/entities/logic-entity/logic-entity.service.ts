import _ from 'lodash';
import { LogicEntityDto } from '@dto/logic/logic-entity.dto';
import { HintCalculatorEntity } from '@entities/hint-calculator-entity/hint-calculator-entity';

export class LogicEntity {
  readonly answer: boolean[][];
  readonly hintRow: number[][];
  readonly hintColumn: number[][];
  readonly timeLimit: number;
  readonly title: string;
  readonly authorId: string;
  readonly size: number;

  constructor(logicEntityDto: LogicEntityDto) {
    this.answer = logicEntityDto.answer;
    this.timeLimit = logicEntityDto.timeLimit;
    this.title = logicEntityDto.title;
    this.authorId = logicEntityDto.authorId;
    this.hintRow = logicEntityDto.answer
      ? HintCalculatorEntity.getHints(logicEntityDto.answer).row
      : undefined;
    this.hintColumn = logicEntityDto.answer
      ? HintCalculatorEntity.getHints(logicEntityDto.answer).column
      : undefined;
    this.size = logicEntityDto.answer
      ? logicEntityDto.answer.length
      : undefined;
  }
}

//문제: 로직엔티티에 있는 프로퍼티들이 업데이트할 때는 전부 존재하지 않음

// 1. 로직 엔티티가 비어있는 상태로 만들어지는건 위험하다.
// 비어있는 상태가 괜찮으려면?
//  - 업데이트를 위한 엔티티여야 한다.
//    X 업데이트를 위한 엔티티를 따로 만드나?
//  - id로 로직을 식별.
//    - id를 앱단에서 생성해야됨.
//  - 비어있어도 되는 경우와 안되는 경우를 분리.
//      - logicEntity 내에 스테이트를 가지거나
//      X logicEntity를 두 개로 분리해야 됨.
//        - 로직엔티티가 자체적으로 완성본이어야 하지 않나?
// 2. getHints가 엔티티 내에 있어야 되는가?
//  - 맞는거 같음

// updateDto._id -> db에서 로직을 가져와서 -> 가져온 로직을 엔티티에 넣어서 수정하고 -> db 업데이트
//  - 불필요하게 로직을 가져와야함 - 이건 진짜 개 이상한거임(db에서 할 일을 코드에서함)

// 로직 분리 시
// (partial)LogicEntity 에 넣어서 -> db 업데이트
