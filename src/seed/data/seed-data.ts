import * as bcrypt from 'bcrypt'
import { ValidRoles } from 'src/auth/interfaces'
import { FormStatus, QuestionType } from 'src/forms/interfaces'

interface SeedUser {
    email:    string
    fullName: string
    password: string
    roles:     ValidRoles[]
}

interface SeedForm {
    title: string
    description?: string
    status?: FormStatus
    targetRoles?: ValidRoles[]
    questions: SeedQuestion[]
}

interface SeedQuestion {
    text: string;
    type: QuestionType;
    options?: string[];
    required?: boolean;
}

interface SeedAnswer {
    responses: string[];
    userIndex: number;
    formIndex: number;
    questionIndex: number;
}

interface SeedData {
    users: SeedUser[]
    forms: SeedForm[]
    answers: SeedAnswer[]
}

export const initialData: SeedData = {
  users: [
      {
          email: 'user1@example.com',
          fullName: 'John Doe',
          password: bcrypt.hashSync('Password1', 10),
          roles: [ValidRoles.user, ValidRoles.admin],
      },
      {
          email: 'user2@example.com',
          fullName: 'Jane Smith',
          password: bcrypt.hashSync('Password2', 10),
          roles: [ValidRoles.user, ValidRoles.operario],
      },
      {
          email: 'user3@example.com',
          fullName: 'Alice Johnson',
          password: bcrypt.hashSync('Password3', 10),
          roles: [ValidRoles.user, ValidRoles.supervisor],
      },
      {
          email: 'maria.lopez@example.com',
          fullName: 'María López',
          password: bcrypt.hashSync('Password4', 10),
          roles: [ValidRoles.user, ValidRoles.admin],
      },
      {
          email: 'juan.garcia@example.com',
          fullName: 'Juan García',
          password: bcrypt.hashSync('Password5', 10),
          roles: [ValidRoles.user, ValidRoles.operario, ValidRoles.supervisor],
      },
      {
          email: 'ana.martinez@example.com',
          fullName: 'Ana Martínez',
          password: bcrypt.hashSync('Password6', 10),
          roles: [ValidRoles.user, ValidRoles.admin],
      },
      {
          email: 'pedro.sanchez@example.com',
          fullName: 'Pedro Sánchez',
          password: bcrypt.hashSync('Password7', 10),
          roles: [ValidRoles.user],
      },
      {
          email: 'lucia.fernandez@example.com',
          fullName: 'Lucía Fernández',
          password: bcrypt.hashSync('Password8', 10),
          roles: [ValidRoles.user, ValidRoles.admin],
      },
      {
          email: 'roberto.diaz@example.com',
          fullName: 'Roberto Díaz',
          password: bcrypt.hashSync('Password9', 10),
          roles: [ValidRoles.user],
      },
      {
          email: 'carmen.ruiz@example.com',
          fullName: 'Carmen Ruiz',
          password: bcrypt.hashSync('Password10', 10),
          roles: [ValidRoles.user, ValidRoles.admin],
      },
  ],


  forms: [
      {
          title: 'Feedback Form',
          description: 'Please provide your feedback.',
          status: FormStatus.active,
          targetRoles: [ValidRoles.operario, ValidRoles.supervisor],
          questions: [
              {
                  text: 'How satisfied are you with our service?',
                  type: QuestionType.SingleChoice,
                  options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
                  required: true,
              },
              {
                  text: 'What do you like the most about our service?',
                  type: QuestionType.OpenEnded,
                  required: false,
              },
          ],
      },
      {
          title: 'Product Survey',
          status: FormStatus.pending,
          targetRoles: [ValidRoles.operario],
          questions: [
              {
                  text: 'Which of our products do you use?',
                  type: QuestionType.MultipleChoice,
                  options: ['Product A', 'Product B', 'Product C'],
                  required: true,
              },
              {
                  text: 'Would you recommend our products to others?',
                  type: QuestionType.SingleChoice,
                  options: ['Yes', 'No'],
                  required: true,
              },
          ],
      },
      {
          title: 'Evaluación de Curso Online',
          description: 'Ayúdanos a mejorar la calidad de nuestros cursos',
          status: FormStatus.active,
          targetRoles: [ValidRoles.supervisor],
          questions: [
              {
                  text: '¿Cómo calificarías la calidad del contenido?',
                  type: QuestionType.SingleChoice,
                  options: ['Excelente', 'Bueno', 'Regular', 'Malo', 'Muy malo'],
                  required: true,
              },
              {
                  text: '¿Qué temas te gustaría que se incluyeran en futuros cursos?',
                  type: QuestionType.OpenEnded,
                  required: false,
              },
              {
                  text: 'Selecciona los recursos que te resultaron más útiles',
                  type: QuestionType.MultipleChoice,
                  options: ['Videos', 'PDFs', 'Ejercicios prácticos', 'Foros de discusión', 'Tutorías en vivo'],
                  required: true,
              }
          ]
      },
      {
          title: 'Encuesta de Satisfacción Laboral',
          description: 'Tu opinión es importante para mejorar el ambiente laboral',
          status: FormStatus.active,
          questions: [
              {
                  text: '¿Qué tan satisfecho estás con tu trabajo actual?',
                  type: QuestionType.SingleChoice,
                  options: ['Muy satisfecho', 'Satisfecho', 'Neutral', 'Insatisfecho', 'Muy insatisfecho'],
                  required: true,
              },
              {
                  text: 'Selecciona los aspectos que más valoras de tu trabajo',
                  type: QuestionType.MultipleChoice,
                  options: ['Salario', 'Ambiente laboral', 'Oportunidades de crecimiento', 'Flexibilidad horaria', 'Beneficios'],
                  required: true,
              },
              {
                  text: '¿Qué sugerencias tienes para mejorar el ambiente laboral?',
                  type: QuestionType.OpenEnded,
                  required: false,
              }
          ]
      },
      {
          title: 'Registro de Incidencias',
          description: 'Formulario para reportar problemas técnicos',
          status: FormStatus.active,
          questions: [
              {
                  text: 'Categoría del problema',
                  type: QuestionType.SingleChoice,
                  options: ['Hardware', 'Software', 'Red', 'Seguridad', 'Otros'],
                  required: true,
              },
              {
                  text: 'Describe el problema en detalle',
                  type: QuestionType.OpenEnded,
                  required: true,
              },
              {
                  text: 'Nivel de urgencia',
                  type: QuestionType.SingleChoice,
                  options: ['Crítico', 'Alto', 'Medio', 'Bajo'],
                  required: true,
              }
          ]
      },
      {
          title: 'Evaluación de Proyecto',
          status: FormStatus.active,
          questions: [
              {
                  text: 'Estado actual del proyecto',
                  type: QuestionType.SingleChoice,
                  options: ['En tiempo', 'Con retraso', 'Adelantado', 'En pausa'],
                  required: true,
              },
              {
                  text: '¿Qué riesgos has identificado?',
                  type: QuestionType.OpenEnded,
                  required: true,
              },
              {
                  text: 'Recursos necesarios',
                  type: QuestionType.MultipleChoice,
                  options: ['Personal adicional', 'Equipamiento', 'Presupuesto extra', 'Capacitación', 'Herramientas específicas'],
                  required: true,
              }
          ]
      }
  ],

  answers: [
    // Feedback Form
    { responses: ['Very Satisfied'], userIndex: 0, formIndex: 0, questionIndex: 0 },
    { responses: ['The user-friendly interface'], userIndex: 1, formIndex: 0, questionIndex: 1 },
    // Product Survey
    { responses: ['Product A', 'Product C'], userIndex: 2, formIndex: 1, questionIndex: 0 },
    { responses: ['Yes'], userIndex: 3, formIndex: 1, questionIndex: 1 },
    // Evaluación de Curso Online
    { responses: ['Excelente'], userIndex: 4, formIndex: 2, questionIndex: 0 },
    { responses: ['Inteligencia Artificial'], userIndex: 5, formIndex: 2, questionIndex: 1 },
    { responses: ['Videos', 'Ejercicios prácticos'], userIndex: 6, formIndex: 2, questionIndex: 2 },
    // Encuesta de Satisfacción Laboral
    { responses: ['Muy satisfecho'], userIndex: 7, formIndex: 3, questionIndex: 0 },
    { responses: ['Ambiente laboral', 'Flexibilidad horaria'], userIndex: 8, formIndex: 3, questionIndex: 1 },
    { responses: ['Mejor comunicación interna'], userIndex: 9, formIndex: 3, questionIndex: 2 },
    // Registro de Incidencias
    { responses: ['Hardware'], userIndex: 0, formIndex: 4, questionIndex: 0 },
    { responses: ['El equipo no enciende después de una actualización'], userIndex: 1, formIndex: 4, questionIndex: 1 },
    { responses: ['Alto'], userIndex: 2, formIndex: 4, questionIndex: 2 },
    // Evaluación de Proyecto
    { responses: ['En tiempo'], userIndex: 3, formIndex: 5, questionIndex: 0 },
    { responses: ['Falta de recursos humanos'], userIndex: 4, formIndex: 5, questionIndex: 1 },
    { responses: ['Presupuesto extra', 'Capacitación'], userIndex: 5, formIndex: 5, questionIndex: 2 }
  ]
};