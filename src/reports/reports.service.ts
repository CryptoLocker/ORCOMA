import { Injectable} from '@nestjs/common'
import { FormsService } from '../forms/forms.service'
import { AnswersService } from '../answers/answers.service'
import { FeedbackService } from '../feedback/feedback.service'
import { PaginationDto } from '../common/dtos/pagination.dto'
import { Form } from 'src/forms/entities'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class ReportsService {
    constructor(
        private readonly authService: AuthService,
        private readonly formsService: FormsService,
        private readonly answersService: AnswersService,
        private readonly feedbackService: FeedbackService,
    ) { }

    async allFormsReport(paginationDto: PaginationDto) {
        const forms = await this.formsService.findAll(paginationDto)
        const completionReport = await Promise.all(forms.map(form => this.formCompletion(form)))

        const completedForms = completionReport.filter(formReport => 
            formReport.some(userReport => userReport.completionRate === 100)
        )

        return {
            totalForms: forms.length,
            completedForms,
            completionRate: (completedForms.length / forms.length) * 100,
        }
    }

    async formCompletion(form: Form) {
        const users = await this.authService.findAll({ limit: undefined, offset: 0 })

        const results = await Promise.all(users.map(user => 
            this.getUserCompletionReport(user.id, form)
        ))

        return results
    }

    async getUserCompletionReport(userId: string, form: Form) {
        const answers = await Promise.all(form.questions.map(question => 
            this.getUserAnswerForQuestion(userId, question.id)
        ))

        const answeredCount = answers.filter(
            answer => answer !== null
        ).length

        const completionRate = this.calculateCompletionRate(
            answeredCount, 
            form.questions.length
        )

        return { userId, answeredCount, completionRate }
    }

    async getUserAnswerForQuestion(userId: string, questionId: string) {
        return await this.answersService.findByUserAndQuestion(
            userId, 
            questionId
        )
    }

    private calculateCompletionRate(answeredCount: number, totalQuestions: number) {
        return totalQuestions > 0 
        ? (answeredCount / totalQuestions) * 100 
        : 0
    }
}
