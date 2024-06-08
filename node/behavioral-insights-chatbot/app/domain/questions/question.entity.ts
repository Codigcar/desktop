import { IDayEntity } from "../others/day.entity";
import { IModuleEntity } from "../others/module.entity";

export interface IQuestionEntity {
    day_id: string | IDayEntity;
    module_id: string | IModuleEntity;
    day: number;
    module: number;
    _id: string;
    idx: number;
    category: string;
    body: string;
    is_waiting_answer: boolean;
    value: any;
    answers: any;
    response: any;
    show_question_if: any;
    rama: number;
}