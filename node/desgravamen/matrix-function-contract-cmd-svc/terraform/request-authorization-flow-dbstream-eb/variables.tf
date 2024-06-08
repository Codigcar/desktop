variable "env" {
  type = string
}

variable "function_name" {
  type    = string
  # establecer nombre de funcion
  default = "request-authorization"
}

variable "project" {
  type    = string
  default = "matrix"
}

variable "owner" {
  type    = string
  default = "application"
}

variable "cost_center" {
  type    = string
  default = "1111489"
}

#variable for type state machine
variable "type_state_machine" { 
  description = "The type of the state machine"
  default     = "STANDARD"
}
