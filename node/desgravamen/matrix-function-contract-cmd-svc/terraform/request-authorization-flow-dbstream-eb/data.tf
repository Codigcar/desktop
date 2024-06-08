data "aws_region" "main" {}

data "aws_caller_identity" "main" {}

data "aws_ssm_parameter" "build" {
  provider = aws.build
  name     = "terraform-prod-${var.project}"
}

data "aws_dynamodb_table" "stream_source" {
  name = "dyn-${var.env}-${var.project}-contract-events-01"
}

data "aws_sfn_state_machine" "target_request_challenge_flow" {
  name = "sf-${var.env}-${var.project}-request-challenge-flow-01"
}
