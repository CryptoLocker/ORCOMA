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
          password: bcrypt.hashSync('Password1', 10),
          roles: ['user', 'admin'],
      },
      {
          email: 'user2@example.com',
          fullName: 'Jane Smith',
          password: bcrypt.hashSync('Password2', 10),
          roles: ['user'],
      },
      {
          email: 'user3@example.com',
          fullName: 'Alice Johnson',
          password: bcrypt.hashSync('Password3', 10),
          roles: ['user'],
      },
      {
          email: 'maria.lopez@example.com',
          fullName: 'María López',
          password: bcrypt.hashSync('Password4', 10),
          roles: ['user', 'moderator'],
      },
      {
          email: 'juan.garcia@example.com',
          fullName: 'Juan García',
          password: bcrypt.hashSync('Password5', 10),
          roles: ['user'],
      },
      {
          email: 'ana.martinez@example.com',
          fullName: 'Ana Martínez',
          password: bcrypt.hashSync('Password6', 10),
          roles: ['user', 'admin'],
      },
      {
          email: 'pedro.sanchez@example.com',
          fullName: 'Pedro Sánchez',
          password: bcrypt.hashSync('Password7', 10),
          roles: ['user'],
      },
      {
          email: 'lucia.fernandez@example.com',
          fullName: 'Lucía Fernández',
          password: bcrypt.hashSync('Password8', 10),
          roles: ['user', 'moderator'],
      },
      {
          email: 'roberto.diaz@example.com',
          fullName: 'Roberto Díaz',
          password: bcrypt.hashSync('Password9', 10),
          roles: ['user'],
      },
      {
          email: 'carmen.ruiz@example.com',
          fullName: 'Carmen Ruiz',
          password: bcrypt.hashSync('Password10', 10),
          roles: ['user', 'admin'],
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
      {
          title: 'Evaluación de Curso Online',
          description: 'Ayúdanos a mejorar la calidad de nuestros cursos',
          status: FormStatus.active,
          questions: [
              {
                  text: '¿Cómo calificarías la calidad del contenido?',
                  type: QuestionType.SingleChoice,
                  options: ['Excelente', 'Bueno', 'Regular', 'Malo', 'Muy malo'],
                  required: true,
                  answers: [
                      { responses: ['Excelente'] },
                      { responses: ['Bueno'] },
                      { responses: ['Excelente'] },
                  ]
              },
              {
                  text: '¿Qué temas te gustaría que se incluyeran en futuros cursos?',
                  type: QuestionType.OpenEnded,
                  required: false,
                  answers: [
                      { responses: ['Inteligencia Artificial'] },
                      { responses: ['Desarrollo móvil'] },
                  ]
              },
              {
                  text: 'Selecciona los recursos que te resultaron más útiles',
                  type: QuestionType.MultipleChoice,
                  options: ['Videos', 'PDFs', 'Ejercicios prácticos', 'Foros de discusión', 'Tutorías en vivo'],
                  required: true,
                  answers: [
                      { responses: ['Videos', 'Ejercicios prácticos'] },
                      { responses: ['PDFs', 'Tutorías en vivo'] },
                  ]
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
                  answers: []
              },
              {
                  text: 'Selecciona los aspectos que más valoras de tu trabajo',
                  type: QuestionType.MultipleChoice,
                  options: ['Salario', 'Ambiente laboral', 'Oportunidades de crecimiento', 'Flexibilidad horaria', 'Beneficios'],
                  required: true,
                  answers: []
              },
              {
                  text: '¿Qué sugerencias tienes para mejorar el ambiente laboral?',
                  type: QuestionType.OpenEnded,
                  required: false,
                  answers: []
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
                  answers: [
                      { responses: ['Hardware'] },
                      { responses: ['Software'] },
                  ]
              },
              {
                  text: 'Describe el problema en detalle',
                  type: QuestionType.OpenEnded,
                  required: true,
                  answers: [
                      { responses: ['El equipo no enciende después de una actualización'] },
                      { responses: ['Problemas de conexión con la impresora en red'] },
                  ]
              },
              {
                  text: 'Nivel de urgencia',
                  type: QuestionType.SingleChoice,
                  options: ['Crítico', 'Alto', 'Medio', 'Bajo'],
                  required: true,
                  answers: [
                      { responses: ['Alto'] },
                      { responses: ['Medio'] },
                  ]
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
                  answers: []
              },
              {
                  text: '¿Qué riesgos has identificado?',
                  type: QuestionType.OpenEnded,
                  required: true,
                  answers: []
              },
              {
                  text: 'Recursos necesarios',
                  type: QuestionType.MultipleChoice,
                  options: ['Personal adicional', 'Equipamiento', 'Presupuesto extra', 'Capacitación', 'Herramientas específicas'],
                  required: true,
                  answers: []
              }
          ]
      }
  ]
};
  