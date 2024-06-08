export interface IUserQuestionsEntity {
    wa_id: string;
    question_id: string | IUserQuestionsEntity;
    status: string;
    message_id?: string;
    has_answer: boolean;
    is_last_message_of_day?: boolean;
}