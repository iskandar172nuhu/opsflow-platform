terraform {
  backend "s3" {
    bucket = "opsflow-terraform-state-172"
    key    = "opsflow/terraform.tfstate"
    region = "eu-west-2"
  }
}

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}