module "this" {
  source  = "app.terraform.io/matrix-cloud/lambda/template"
  version = "0.0.11"

  env              = var.env
  name             = var.function_name
  filename         = "app.zip"
  source_code_hash = filebase64sha256("app.zip")
  handler          = "functions/contract-authorizer/handler.handler"
  runtime          = "nodejs16.x"
  memory_size      = "256"
  timeout          = 60

  environment = {
    ENV                             = var.env
    CONTRACT_EVENT_STORE_TABLE_NAME = data.aws_dynamodb_table.contract.name
    DYNAMO_LEADS_VIEW_TABLE_NAME    = data.aws_dynamodb_table.leads.name
    POWERTOOLS_SERVICE_NAME         = "${var.project}-function-contract-cmd-svc"
    COGNITO_USER_POOL_ID            = element(data.aws_cognito_user_pools.this.ids, 1)
  }
}

resource "aws_iam_policy" "this" {
  name        = "policy-${var.env}-${var.project}-${var.function_name}-01"
  path        = "/"

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow"
        "Action": [
          "dynamodb:PutItem",
          "dynamodb:Query",
          "kms:Decrypt",
          "kms:Encrypt",
          "cognito-idp:ListUsers"
        ],
        "Resource": [
          data.aws_dynamodb_table.contract.arn,
          data.aws_dynamodb_table.leads.arn,
          data.aws_kms_key.dynamo.arn,
          tolist(data.aws_cognito_user_pools.this.arns)[0]
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = module.this.iam-role.main.name
  policy_arn = aws_iam_policy.this.arn
}
