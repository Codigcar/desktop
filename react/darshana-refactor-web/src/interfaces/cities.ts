export interface ICities {
    status: boolean;
    data:   Datum[];
}

export interface Datum {
    id:           number;
    country_iso2: any;
    name:         string;
    lat:          number;
    lng:          number;
    created_at:   Date;
    updated_at:   Date;
    deleted_at:   null;
}

