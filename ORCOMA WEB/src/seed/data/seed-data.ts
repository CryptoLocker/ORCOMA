import * as bcrypt from 'bcrypt'
import { FormStatus, QuestionType } from 'src/forms/interfaces'

interface SeedUser {
    email:    string
    fullName: string
    password: string
    roles:     string[]
}

interface SeedForm {
    title: string
    description?: string
    status?: FormStatus
    questions: SeedQuestion[]
}

interface SeedQuestion {
    text: string;
    type: QuestionType;
    options?: string[];
    required?: boolean;
    answers?: SeedAnswer[]
}

interface SeedAnswer {
    responses: string[]
}

interface SeedData {
    users: SeedUser[]
    forms: SeedForm[]
}

export const initialData: SeedData = {
    users: [
      {
        email: 'user1@example.com',
        fullName: 'John Doe',
        password: bcrypt.hashSync('password1', 10),
        roles: ['user', 'admin'],
      },
      {
        email: 'user2@example.com',
        fullName: 'Jane Smith',
        password: bcrypt.hashSync('password2', 10),
        roles: ['user'],
      },
      {
        email: 'user3@example.com',
        fullName: 'Alice Johnson',
        password: bcrypt.hashSync('password3', 10),
        roles: ['user'],
      },
    ],
    forms: [
      {
        title: 'Feedback Form',
        description: 'Please provide your feedback.',
        status: FormStatus.active,
        questions: [
          {
            text: 'How satisfied are you with our service?',
            type: QuestionType.SingleChoice,
            options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            required: true,
            answers: [
              { responses: ['Very Satisfied'] },
            ],
          },
          {
            text: 'What do you like the most about our service?',
            type: QuestionType.OpenEnded,
            required: false,
            answers: [
              { responses: ['The user-friendly interface'] },
            ],
          },
        ],
      },
      {
        title: 'Product Survey',
        status: FormStatus.pending,
        questions: [
          {
            text: 'Which of our products do you use?',
            type: QuestionType.MultipleChoice,
            options: ['Product A', 'Product B', 'Product C'],
            required: true,
            answers: [
              { responses: ['Product A', 'Product C'] },
            ],
          },
          {
            text: 'Would you recommend our products to others?',
            type: QuestionType.SingleChoice,
            options: ['Yes', 'No'],
            required: true,
            answers: [],
          },
        ],
      },
    ],
};
  