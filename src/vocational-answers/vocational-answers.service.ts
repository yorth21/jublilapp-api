import { Injectable } from '@nestjs/common';

@Injectable()
export class VocationalAnswersService {
  findAll() {
    return `This action returns all vocationalAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vocationalAnswer`;
  }
}
