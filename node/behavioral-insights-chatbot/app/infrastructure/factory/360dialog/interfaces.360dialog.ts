

export interface ISendMessageInteractive {
    recipient_type: string;
    to:             string;
    type:           string;
    interactive:    Interactive;
}

export interface Interactive {
    type:   string;
    body:   Body;
    action: Action;
}

export interface Action {
    button:   string;
    sections: Section[];
}

export interface Section {
    title: string;
    rows:  Row[];
}

export interface Row {
    id?:    string;
    title: string;
}

export interface Body {
    text: string;
}
