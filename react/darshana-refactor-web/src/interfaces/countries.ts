export interface ICountries {
    status: boolean;
    data:   Datum[];
}

export interface Datum {
    id:         number;
    name:       string;
    nombre:     string;
    nom:        string;
    iso2:       string;
    iso3:       string;
    phone_code: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
