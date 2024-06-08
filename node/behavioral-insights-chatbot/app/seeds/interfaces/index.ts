export interface ISemanas {
    category:          Category;
    body?:             string;
    is_waiting_answer: boolean;
    value:             ISemanaValue;
    answers?:          ISemanaAnswer[];
    response?:         Response;
    show_question_if?: {
        from_question?: string,
        your_answer_is?: string[],
        module?: number,
        counter_question?: {
            module: number,
            from_questions: string[],
            your_answer_is: string[],
            if_less_than: number,
        }
    };
}

export interface ISemanaAnswer {
    option: string;
    score:  number;
    value?:  AnswerValue;
}

export interface AnswerValue {
    is_last_message_of_day? : boolean;
    needDataFrom?: NeedDataFrom;
    type:         Type;
    body:         string;
    description?: string;
}

export type Type = "text" | "audio" | "template" | "image" | "interactive" | "interactive-list" | "sticker" | "contact" | 'pdf';

export type Category = "template" | "info" | "question" | "question_input" | "info_with_conditional_1" | "question_voice" | "question_voice_or_image" | "assign_random_branches";

export interface Response {
    savedDataIn?: SavedDataIn;
    type:        Type;
    body:        string;
    buttons:     Button[];
    answers:     ResponseAnswer[];
}

export interface ResponseAnswer {
    option: string;
    score:  number;
    value?:  Option1;
}

export interface Option1 {
    type: Type;
    body: string;
}

export interface Button {
    title: string;
}

export interface SavedDataIn {
    model:  string;
    column: string;
}

export interface ISemanaValue {
    type?:         Type;
    body?:         string;
    buttons?:      Button[];
    needDataFrom?: NeedDataFrom;
    description?:  string;
    option1?:      Option1;
    option2?:      Option1;
    sections?:     Button[];
    less_than?: {
        type: Type,
        body: string,
    },
    major_than?: {
        type: Type,
        body: string,
    }
}

export interface NeedDataFrom {
    model:   string;
    columns: string[];
    from_question?: string;
    module?: number;
}
