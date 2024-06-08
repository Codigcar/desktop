variable "env" {
  description = "The environment to deploy to"
}
#variable por project
variable "project" {
  description = "The project name"
  default     = "matrix"
}
variable "owner" {
  type    = string
  default = "application"
}
variable "cost_center" {
  type    = string
  default = "1111489"
}

variable "function_name" {
  description = "The name of the function"
  default     = "paymentorderqrysvc"
}
# variable "i2c_provider" {
#   description = "Object with data for interact with the provider i2c"
#   type = object({
#     I2C_HOST = string
#     I2C_PATH = string
#     I2C_PORT = string
#   })
#   default = {
#     I2C_HOST = "ws2.mycardplace.com"
#     I2C_PATH = "/MCPWebServicesRestful/services/MCPWSHandler/getCardholderStatement"
#     I2C_PORT = "6443"
#   }
# }

#variable for step function name
variable "step_function_name" {
  description = "The name of the step function"
  default     = "paymentorderstepfunction"
}

#variable for type state machine
variable "type_state_machine" {
  description = "The type of the state machine"
  default     = "EXPRESS"
}
