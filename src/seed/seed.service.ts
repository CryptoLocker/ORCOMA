import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Form } from 'src/forms/entities';
import { FormsService } from 'src/forms/forms.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly formsService: FormsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>
  ) { }

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertForms(adminUser);

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

  //Returns the first user as it's hardcoded to be an admin
  //By returning it we allow to insert forms without auth limitations
  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = seedUsers.map(user => this.userRepository.create(user));

    const dbUsers = await this.userRepository.save(users);
    return dbUsers[0];
  }

  private async insertForms(user: User) {
    await this.formRepository.delete({});

    const forms = initialData.forms;

    const insertPromises = forms.map((form) => {

      const { questions, ...formData } = form

      const updatedQuestions = questions.map((question) => {

        //Relate answer with user id
        const { answers, ...questionData } = question;
        const updatedAnswers = answers.map(
          (answer) => ({
            userId: user.id,
            ...answer,
          })
        );

        //update question for valid transaction
        return {
          ...questionData,
          answers: updatedAnswers
        };
      }
      )
      //reconnect the questions with the form
      return this.formsService.create({ ...formData, questions: updatedQuestions }, user);
    }
    )

    await Promise.all(insertPromises);

    return true;
  }
}