import { IUserQuestionsEntity } from "../user_questions/user_questions.entity";
import { IUserMessagesEntity } from "./user_messages.entity";


export class UserMessagesValue implements IUserMessagesEntity {
    wa_id: string;
    message: string;
    user_question_id: string | IUserQuestionsEntity;
    idx: number;
    from_question: string;
    module: number;
    day: number;

    constructor(userMessages: IUserMessagesEntity) {
        this.wa_id = userMessages.wa_id;
        this.message = userMessages.message;
        this.user_question_id = userMessages.user_question_id;
        this.idx = userMessages.idx;
        this.from_question = userMessages.from_question;
        this.module = userMessages.module;
        this.day = userMessages.day;
    }
}