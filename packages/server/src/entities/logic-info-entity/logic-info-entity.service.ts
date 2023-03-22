import { LogicInfoEntityDto } from '@dto/logicInfo/logic-info-entity.dto';
import { SolvedLogicDto } from '@dto/solvedLogic/create-solved-logic.dto';

export class LogicInfoEntity {
  logicId: string;
  views: number;
  solvedCount: number;
  likes: number;
  averageSolvedTimeMs: number;
  bestSolvedTimeMs: number;

  constructor(logicInfoEntityDto: LogicInfoEntityDto) {
    this.logicId = logicInfoEntityDto.logicId;
    this.views = logicInfoEntityDto.views;
    this.solvedCount = logicInfoEntityDto.solvedCount;
    this.likes = logicInfoEntityDto.likes;
    this.averageSolvedTimeMs = logicInfoEntityDto.averageSolvedTimeMs;
    this.bestSolvedTimeMs = logicInfoEntityDto.bestSolvedTimeMs;
  }

  private addAverageSolvedTimeMs(solvedTimeMs: number) {
    this.averageSolvedTimeMs =
      (this.averageSolvedTimeMs * this.solvedCount + solvedTimeMs) /
      (this.solvedCount + 1);
  }

  private incrementSolvedCount() {
    this.solvedCount += 1;
  }

  private addBestSolvedTimeMs(solvedTimeMs: number) {
    this.bestSolvedTimeMs = Math.min(solvedTimeMs, this.bestSolvedTimeMs);
  }

  addSolvedLogic(solvedLogic: SolvedLogicDto) {
    this.addAverageSolvedTimeMs(solvedLogic.solvedTimeMs);
    this.incrementSolvedCount();
    this.addBestSolvedTimeMs(solvedLogic.solvedTimeMs);
  }
}
