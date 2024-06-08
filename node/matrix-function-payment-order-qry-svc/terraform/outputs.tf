output "data" {
  value = {
    step-function   = module.step-function-base.main["step-function"]
    role-apigateway = module.step-function-base.main["role-apigateway"]
    lambda-function = module.main.lambda-function.main
  }
}
