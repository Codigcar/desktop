data "aws_region" "main" {}

data "aws_caller_identity" "main" {}

data "aws_ssm_parameter" "build" {
  provider = aws.build
  name     = "terraform-prod-${var.project}"
}

data "aws_kms_key" "dynamo" {
  key_id = "alias/kms-${var.env}-${var.project}-dyn-01"
}

data "aws_dynamodb_table" "contract" {
  name = "dyn-${var.env}-${var.project}-contract-events-01"
}

data "aws_dynamodb_table" "leads" {
  name = "dyn-${var.env}-${var.project}-leads-view-01"
}

data "aws_cognito_user_pools" "this" {
  name = "cup-${var.env}-${var.project}-01"
}
