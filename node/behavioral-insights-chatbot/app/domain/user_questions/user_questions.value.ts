import { IUserQuestionsEntity } from "./user_questions.entity";

export class UserQuestionsValue implements IUserQuestionsEntity {
    wa_id: string;
    question_id: string | IUserQuestionsEntity;
    status: string;
    message_id?: string;
    has_answer: boolean;
    is_last_message_of_day?: boolean;
    
    constructor(userQuestions: IUserQuestionsEntity) {
        this.wa_id = userQuestions.wa_id;
        this.question_id = userQuestions.question_id;
        this.status = userQuestions.status;
        this.message_id = userQuestions.message_id;
        this.has_answer = userQuestions.has_answer;
        this.is_last_message_of_day = userQuestions.is_last_message_of_day;
    }
}