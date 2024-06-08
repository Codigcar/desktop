data "aws_region" "main" {}

data "aws_caller_identity" "main" {}

data "aws_ssm_parameter" "build" {
  provider = aws.build
  name     = "terraform-prod-${var.project}"
}

data "aws_kms_key" "dynamo" {
  key_id = "alias/kms-${var.env}-${var.project}-dyn-01"
}

data "aws_kms_key" "msk" {
  key_id = "alias/kms-${var.env}-${var.project}-msk-01"
}

data "aws_dynamodb_table" "contract" {
  name = "dyn-${var.env}-${var.project}-contract-events-01"
}

data "aws_dynamodb_table" "notifications" {
  name = "dyn-${var.env}-${var.project}-notification-events-01"
}

data "aws_msk_cluster" "this" {
  cluster_name = "msk-${var.env}-${var.project}-01"
}

data "aws_secretsmanager_secret" "this" {
  name = "AmazonMSK_sm-${var.env}-${var.project}-msk-01"
}

data "aws_secretsmanager_secret_version" "main" {
  secret_id = data.aws_secretsmanager_secret.this.id
}