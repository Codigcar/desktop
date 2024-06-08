
resource "aws_cloudformation_stack" "cloudformation_stack" {
  name = "cloud-stack-eb-${var.env}-${var.project}-${var.function_name}-01"

  parameters = {
    RoleArn          = aws_iam_role.pipe_role.arn
    SourceArn        = data.aws_dynamodb_table.stream_source.stream_arn
    TargetArn        = data.aws_sfn_state_machine.target_request_challenge_flow.arn
    NamePipe         = "eb-pipe-dbstream-${var.env}-${var.project}-${var.function_name}-01"
    StartingPosition = "TRIM_HORIZON"
    InvocationType   = "FIRE_AND_FORGET"
  }

  template_body = jsonencode({
    "Parameters" : {
      "SourceArn" : {
        "Type" : "String",
      },
      "TargetArn" : {
        "Type" : "String",
      },
      "RoleArn" : {
        "Type" : "String"
      },
      "NamePipe" : {
        "Type" : "String"
      },
      "StartingPosition" : {
        "Type" : "String"
      },
      "InvocationType" : {
        "Type" : "String"
      }
    },
    "Resources" : {
      "ContractRequestAuthorization" : {
        "Type" : "AWS::Pipes::Pipe",
        "Properties" : {
          "Name" : { "Ref" : "NamePipe" },
          "RoleArn" : { "Ref" : "RoleArn" }
          "Source" : { "Ref" : "SourceArn" },
          "SourceParameters" : {
            "DynamoDBStreamParameters" : {
              "StartingPosition" : { "Ref" : "StartingPosition" }
            },
            "FilterCriteria" : {
              "Filters" : [
                { "Pattern" : "{ \"eventName\": [\"INSERT\"], \"dynamodb\": { \"NewImage\": { \"type\": { \"S\": [ \"pe.io.contract.authorization-requested.v1\" ] } } } }" }
              ]
            }
          },
          "Target" : { "Ref" : "TargetArn" },
          "TargetParameters" : {
            "StepFunctionStateMachineParameters" : {
              "InvocationType" : { "Ref" : "InvocationType" }
            },
            "InputTemplate" : "{ \"transaction\":<$.dynamodb.NewImage.source.S>, \"identity\":<$.dynamodb.NewImage.author.S>, \"type\":\"challenge\", \"details\":{ \"message\":\"Solicitud de contratacion\", \"hiddenDetails\":{ \"action\":\"contract-offer-flow\", \"source\":<$.dynamodb.NewImage.source.S>, \"user\":<$.dynamodb.NewImage.author.S>, \"leadId\":<$.dynamodb.NewImage.data.M.payload.M.offerId.S>, \"acceptDataProtection\":\"<$.dynamodb.NewImage.data.M.payload.M.dataProtectionClauseAccepted.BOOL>\", \"amountOfCredit\":<$.dynamodb.NewImage.data.M.payload.M.conditions.M.creditLine.N>}}}"
          }
        }
      }
    }
  })
}

resource "aws_iam_role" "pipe_role" {
  name = "iam-role-stack-${var.env}-${var.project}-${var.function_name}-01"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "pipes.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    tag-key = "tag-value"
  }
}

resource "aws_iam_policy" "policy" {
  name        = "iam-policy-stack-db-${var.env}-${var.project}-${var.function_name}-01"
  path        = "/"
  description = "Policy pipe ${var.function_name}"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "states:StartExecution"
        ],
        "Resource" : "*",
        "Effect" : "Allow"
      },
      {
        "Action" : [
          "kms:Decrypt",
          "kms:Encrypt"
        ],
        "Resource" : "*",
        "Effect" : "Allow"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : "*"
      },
      {
        "Action" : [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:GetRecords",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:GetShardIterator",
          "dynamodb:DescribeStream",
          "dynamodb:ListStreams"],
        "Effect" : "Allow",
        "Resource" : [
          "${data.aws_dynamodb_table.stream_source.arn}",
          "${data.aws_dynamodb_table.stream_source.stream_arn}"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach" {
  role       = aws_iam_role.pipe_role.name
  policy_arn = aws_iam_policy.policy.arn
}
