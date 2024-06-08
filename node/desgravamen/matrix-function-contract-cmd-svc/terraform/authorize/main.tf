module "this" {
  source  = "app.terraform.io/matrix-cloud/lambda/template"
  version = "0.0.11"

  env              = var.env
  name             = var.function_name
  filename         = "app.zip"
  source_code_hash = filebase64sha256("app.zip")
  handler          = "functions/authorize/handler.handler"
  runtime          = "nodejs16.x"
  memory_size      = "256"
  timeout          = 60

  environment = {
    ENV                             = var.env
    REGION                       = "us-east-1"
    CONTRACT_EVENT_STORE_TABLE_NAME = data.aws_dynamodb_table.contract.name
    MSK_TOPIC_CHALLENGE_APPROVED       = "pe.io.verification.challenge.approved.v1"
    COGNITO_USER_POOL_ID            = element(data.aws_cognito_user_pools.this.ids, 1)
    DYNAMO_LEADS_VIEW_TABLE_NAME    = data.aws_dynamodb_table.leads.name
  }
}

resource "aws_lambda_event_source_mapping" "this" {
  event_source_arn  = data.aws_msk_cluster.this.arn
  function_name     = module.this.lambda-function.main.arn
  topics            = ["pe.io.verification.challenge.approved.v1"]
  starting_position = "TRIM_HORIZON"

  source_access_configuration {
    type = "SASL_SCRAM_512_AUTH"
    uri  = data.aws_secretsmanager_secret.this.arn
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
          "secretsmanager:GetSecretValue",
          "cognito-idp:ListUsers"
        ],
        "Resource": [
          data.aws_dynamodb_table.contract.arn,
          "${data.aws_dynamodb_table.contract.arn}/index/*",
          data.aws_dynamodb_table.leads.arn,
          data.aws_kms_key.dynamo.arn,
          data.aws_kms_key.msk.arn,
          data.aws_secretsmanager_secret.this.arn,
          tolist(data.aws_cognito_user_pools.this.arns)[0]
        ]
      },
      {
        "Effect": "Allow"
        "Action": [
          "kafka-cluster:Connect",
          "kafka-cluster:DescribeGroup",
          "kafka-cluster:AlterGroup",
          "kafka-cluster:DescribeTopic",
          "kafka-cluster:ReadData",
          "kafka-cluster:DescribeClusterDynamicConfiguration",
          "kafka:DescribeCluster",
          "kafka:GetBootstrapBrokers",
          "kafka:ListScramSecrets"
        ],
        "Resource": [
          data.aws_msk_cluster.this.arn,
          "${replace(data.aws_msk_cluster.this.arn, "cluster","topics")}/*"
        ]
      },
      {
        "Action": [
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:DescribeVpcs"
        ],
        "Effect": "Allow",
        "Resource": [
          "*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = module.this.iam-role.main.name
  policy_arn = aws_iam_policy.this.arn
}
