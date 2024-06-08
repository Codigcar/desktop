terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = ">= 4.20.0"
  }

  backend "remote" {}
}

provider "aws" {
  assume_role {
    role_arn     = "arn:aws:iam::${jsondecode(data.aws_ssm_parameter.build.value)["${var.env}"]}:role/github-deploy"
    session_name = "github-deploy"
  }

  default_tags {
    tags = {
      PROJECT     = upper(var.project)
      OWNER       = upper(var.owner)
      COST-CENTER = upper(var.cost_center)
      ENVIRONMENT = upper(var.env)
    }
  }
}

provider "aws" {
  alias = "build"
}