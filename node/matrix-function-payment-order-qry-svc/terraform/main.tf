module "main" {
  source  = "app.terraform.io/matrix-cloud/lambda/template"
  version = "0.0.13"

  name             = var.function_name
  env              = var.env
  filename         = "app.zip"
  source_code_hash = filebase64sha256("app.zip")
  runtime          = "nodejs16.x"
  handler          = "handlers/paymentOrderHandlerSvc.main"
  memory_size      = "128"
  timeout          = 5
  environment = {
    ENV                                                     = var.env
    REGION                                                  = data.aws_region.main.name
    I2C_HOST                                                = local.i2c_vars[var.env]["I2C_HOST"]
    I2C_PATH                                                = local.i2c_vars[var.env]["I2C_PATH"]
    I2C_PORT                                                = local.i2c_vars[var.env]["I2C_PORT"]
    I2C_CREDENTIAL                                          = data.aws_secretsmanager_secret.main.name
    I2C_DELAY_FOR_SERVICE_GETCARDHOLDERSTATEMENT_IN_MINUTES = 15
    DYNAMODB_TABLE_PAYMENTS_EVENTS                          = data.aws_dynamodb_table.payments_events.name
    PAYMENTS_EVENTS_TYPE_COMPLETED                          = "com.gcredicorp.matrix.payment.completed.v1"
  }
}

#aws_iam_role_policy
resource "aws_iam_policy" "main" {
  name = "policy-${var.env}-${var.project}-payment-order-qry-svc-01"
  path = "/"
  #policy jsoncode #statement logs
  policy = jsonencode({
    "Version" = "2012-10-17",
    "Statement" = [
      {
        "Effect" = "Allow",
        "Action" = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogStreams",
          "logs:DescribeLogGroups"
        ],
        "Resource" = "arn:aws:logs:${data.aws_region.main.name}:${data.aws_caller_identity.main.account_id}:*"
      },
      {
        "Action" : [
          "secretsmanager:GetSecretValue"
        ],
        "Resource" : [
          data.aws_secretsmanager_secret.main.arn
        ],
        "Effect" : "Allow"
      },
      {
        "Action" : [
          "kms:Decrypt",
          "kms:Encrypt",
          "kms:GenerateDataKey"
        ],
        "Resource" : [
          data.aws_kms_key.dynamodb.arn,
          data.aws_kms_key.secretmanager.arn
        ],
        "Effect" : "Allow"
      },
      {
        "Action" : [
          "dynamodb:Query"
        ],
        "Resource" : [
          data.aws_dynamodb_table.payments_events.arn,
          "${data.aws_dynamodb_table.payments_events.arn}/*"
        ],
        "Effect" : "Allow"
      }
    ]
  })
  tags = {
    Name          = "policy-${var.env}-${var.project}-payment-order-qry-svc-01"
    RESOURCE-NAME = upper("policy-${var.env}-${var.project}-payment-order-qry-svc-01")
    FUNCTION      = "POLICY"
  }
}

#attach policy to role
resource "aws_iam_role_policy_attachment" "main" {
  role       = module.main.iam-role.main.name
  policy_arn = aws_iam_policy.main.arn
}

#================================================================================================
# Module: terraform-aws-step-function
# Language: terraform
# template for step function
# returns a map with the following keys:
#   - role-step-function : the role for the step function
# =================================================================================================

module "step-function-base" {
  source  = "app.terraform.io/matrix-cloud/step-function/template"
  version = "0.0.5"

  name                          = var.function_name
  env                           = var.env
  policy_document_step_function = data.aws_iam_policy_document.main
  definition = templatefile("${path.module}/console.json.tftpl", {
    dyn_table_name = data.aws_dynamodb_table.accounts_view.name,
    lambda_arn     = module.main.lambda-function.main.arn
  })
}
