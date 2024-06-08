import { Category } from "./ICategories";

export interface IRecords {
    date:   String;
    userId: string;
    form:   IForm;
}

export interface IForm {
    categories: Category[];
}

// export interface Category {
//     name:          string;
//     subcategories: Subcategory[];
// }

// export interface Subcategory {
//     name:     string;
//     controls: Control[];
// }

// export interface Control {
//     name:  string;
//     value: number;
// }
