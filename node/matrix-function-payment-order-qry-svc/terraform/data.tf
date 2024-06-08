data "aws_region" "main" {}
data "aws_caller_identity" "main" {}

#aws_iam_policy_document for the step function
data "aws_iam_policy_document" "main" {
  # statement for invoke lambda
  statement {
    actions = [
      "lambda:InvokeFunction"
    ]
    resources = [
      "${module.main.lambda-function.main.arn}:*"
    ]
    effect = "Allow"
  }
  #statement for dynamodb query
  statement {
    actions = [
      "dynamodb:Query",
      "dynamodb:BatchGetItem"
    ]
    resources = [
      data.aws_dynamodb_table.accounts_view.arn,
      "${data.aws_dynamodb_table.accounts_view.arn}/*"
    ]
    effect = "Allow"
  }
  statement {
    actions = [
      "kms:GenerateDataKey",
      "kms:Decrypt",
      "kms:Encrypt"
    ]

    resources = [data.aws_kms_key.dynamodb.arn]
    effect    = "Allow"
  }
}


locals {
  i2c_vars = {
    dev = {
      I2C_HOST = "ws2.mycardplace.com"
      I2C_PATH = "/MCPWebServicesRestful/services/MCPWSHandler/getCardholderStatement"
      I2C_PORT = "6443"
    }
    qa = {
      I2C_HOST = "ws2.mycardplace.com"
      I2C_PATH = "/MCPWebServicesRestful/services/MCPWSHandler/getCardholderStatement"
      I2C_PORT = "6443"
    }
    uat = {
      I2C_HOST = "ws2.mycardplace.com"
      I2C_PATH = "/MCPWebServicesRestful/services/MCPWSHandler/getCardholderStatement"
      I2C_PORT = "6443"
    }
    prod = {
      I2C_HOST = "ws2.mycardplace.com"
      I2C_PATH = "/MCPWebServicesRestful/services/MCPWSHandler/getCardholderStatement"
      I2C_PORT = "6443"
    }
  }
}

data "aws_ssm_parameter" "build" {
  provider = aws.build
  name     = "terraform-prod-${var.project}"
}

data "aws_kms_key" "secretmanager" {
  key_id = "alias/kms-${var.env}-${var.project}-sm-01"
}
data "aws_secretsmanager_secret" "main" {
  name = "sm-${var.env}-${var.project}-i2c-credentials-01"
}

# for the step function role
data "aws_kms_key" "dynamodb" {
  key_id = "alias/kms-${var.env}-${var.project}-dyn-01"
}

data "aws_dynamodb_table" "accounts_view" {
  name = "dyn-${var.env}-${var.project}-accounts-view-01"
}

data "aws_dynamodb_table" "payments_events" {
  name = "dyn-${var.env}-${var.project}-payments-events-01"
}
