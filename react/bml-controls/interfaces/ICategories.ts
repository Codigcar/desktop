export interface ICategories {
    _id:        string;
    code:       string;
    categories: Category[];
    __v:        number;
}

export interface Category {
    name:          string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    name:     string;
    controls: Control[];
    average?:number;
}

export interface Control {
    name: string;
    value?: number;
}
