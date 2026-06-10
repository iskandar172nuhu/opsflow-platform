resource "aws_ecs_cluster" "opsflow_cluster" {
  name = "${var.project_name}-cluster"
}