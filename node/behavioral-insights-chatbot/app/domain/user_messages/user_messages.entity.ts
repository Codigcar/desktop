import { IUserQuestionsEntity } from "../user_questions/user_questions.entity";

export interface IUserMessagesEntity {
    wa_id: string;
    message: string;
    user_question_id: string | IUserQuestionsEntity;
    idx: number;
    from_question: string;
    module: number;
    day: number;
}