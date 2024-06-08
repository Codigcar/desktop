import {IUserEntity} from "./user.entity";


export class UserValue implements IUserEntity {
    wa_id: string;
    phone: string;
    email: string;
    name: string;
    score: number;
    children_1_name: string;
    children_1_birthdate: string;
    fortress: string;
    active_day: number;
    active_module: number;
    branches: any;
    branch: any;

    constructor(user: IUserEntity) {
        this.wa_id = user.wa_id;
        this.phone = user.phone;
        this.email = user.email;
        this.name = user.name;
        this.score = user.score;
        this.children_1_name = user.children_1_name;
        this.children_1_birthdate = user.children_1_birthdate;
        this.fortress = user.fortress;
        this.active_day = user.active_day;
        this.active_module = user.active_module;
        this.branch = user.branch;
    }
}
