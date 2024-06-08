export interface IAnswerCorrect {
    id: number;
    text: string;
    score: number;
    question_id: number;
    type_id: number;

    //
    deletedAt: string;
    updatedAt: string;
    createdAt: string;
}