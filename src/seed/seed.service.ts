import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Form } from 'src/forms/entities';
import { FormsService } from 'src/forms/forms.service';
import { Answer } from 'src/answers/entities/answer.entity';

import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly formsService: FormsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) { }

  async runSeed() {
    await this.deleteTables();
    const users = await this.insertUsers();
    const forms = await this.insertForms(users[0]);
    await this.insertAnswers(users, forms);
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.formsService.removeAll();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = seedUsers.map(
      user => this.userRepository.create(user)
    );

    const dbUsers = await this.userRepository.save(users);
    return dbUsers;
  }

  private async insertForms(user: User) {

    const seedForms = initialData.forms;

    const insertPromises = seedForms.map(
      form => this.formsService.create(form, user)
    );

    const forms = await Promise.all(insertPromises);

    return forms;
  }

  private async insertAnswers(users: User[], forms: Form[]) {
    const seedAnswers = initialData.answers;

    for (const a of seedAnswers) {
      const user = users[a.userIndex];
      const form = forms[a.formIndex];
      const question = form.questions[a.questionIndex];
      await this.answerRepository.save({
        responses: a.responses,
        user,
        question,
      });
    }
    return true;
  }
}