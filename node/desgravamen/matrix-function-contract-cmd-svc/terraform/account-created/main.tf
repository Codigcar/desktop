module "this" {
  source  = "app.terraform.io/matrix-cloud/lambda/template"
  version = "0.0.11"

  env              = var.env
  name             = var.function_name
  filename         = "app.zip"
  source_code_hash = filebase64sha256("app.zip")
  handler          = "functions/account-created/handler.handler"
  runtime          = "nodejs16.x"
  memory_size      = "128"
  timeout          = 60

  environment = {
    ENV                             = var.env
    CONTRACT_EVENT_STORE_TABLE_NAME = data.aws_dynamodb_table.contract.name
    MSK_TOPIC_ACCOUNT_CREATED       = "com.gcredicorp.matrix.account.created.v1"
    MSK_BROKERS                     = data.aws_msk_cluster.this.bootstrap_brokers_sasl_scram
    MSK_CLIENT_ID                   = "lmb-contract-cmd_account-created-client"
    POWERTOOLS_SERVICE_NAME         = "${var.project}-function-${var.function_name}"
  }
}

resource "aws_lambda_event_source_mapping" "this" {
  event_source_arn  = data.aws_msk_cluster.this.arn
  function_name     = module.this.lambda-function.main.arn
  topics            = ["com.gcredicorp.matrix.account.created.v1"]
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
          "secretsmanager:GetSecretValue"
        ],
        "Resource": [
          data.aws_dynamodb_table.contract.arn,
          "${data.aws_dynamodb_table.contract.arn}/index/*",
          data.aws_kms_key.dynamo.arn,
          data.aws_kms_key.msk.arn,
          data.aws_secretsmanager_secret.this.arn
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
