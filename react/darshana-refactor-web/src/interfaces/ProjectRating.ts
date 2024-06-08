

 export interface ProjectRating {
  project_application:           ProjectApplication;
  project_talent_qualifications: ProjectTalentQualifications | null;
}

 interface ProjectApplication {
  id:                      number;
  user_uuid:               string;
  project_id:              number;
  proposal:                string;
  procedure_text:          string;
  accept_price:            boolean;
  price_proposal:          number;
  accept_time:             boolean;
  days:                    number;
  ready_to_close:          boolean;
  accepted:                number;
  close_at_proposal:       string;
  recieve_pay_at:          string;
  send_pay_at:             null;
  recieve_pay_order_id:    null;
  send_pay_order_id:       null;
  talent_payment:          null;
  weeks:                   number;
  shown_accepted_message:  boolean;
  algorand_transaction:    null | string;
  near_transaction:        null | string;
  updated:                 boolean | null;
  salary_counter_proposal: null;
  time_counter_proposal:   null;
  counter_proposal_status: null;
  project:                 Project;
  user_detail:             UserDetail;
}

 interface Project {
  id:             number;
  name:           string;
  user_uuid:      string;
  project_status: ProjectStatus;
}

 interface ProjectStatus {
  id:      number;
  name:    string;
  visible: boolean;
}

 interface UserDetail {
  id:                  number;
  user_uuid:           string;
  full_name:           string;
  subtitle:            null | string;
  profile_picture_url: null | string;
}

export interface ProjectTalentQualifications {
  user_uuid:  string;
  project_id: number;
  comment:    string;
  score:      number;
}

 interface Meta {
  last_page: number;
}
