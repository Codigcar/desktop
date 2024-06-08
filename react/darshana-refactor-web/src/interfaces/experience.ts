export interface IExperience {
    id: string;
    workplace_name:  string;
    start_date:      string;
    end_date?:        string | null;
    description:     string;
    work_here:       boolean;
    position:        string;
    enable_business: boolean;
}