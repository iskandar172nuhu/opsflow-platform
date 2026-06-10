variable "aws_region" {
  default = "eu-west-2"
}

variable "project_name" {
  default = "opsflow"
}

variable "dockerhub_username" {
  description = "Docker Hub username"
  type        = string
}