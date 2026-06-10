resource "aws_ecs_cluster" "opsflow_cluster" {
  name = "${var.project_name}-cluster"
}

resource "aws_cloudwatch_log_group" "frontend_logs" {
  name              = "/ecs/${var.project_name}-frontend"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "frontend_task" {
  family                   = "${var.project_name}-frontend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "frontend"
      image     = "${var.dockerhub_username}/opsflow-frontend:latest"
      essential = true

      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.frontend_logs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "frontend"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "frontend_service" {
  name            = "${var.project_name}-frontend-service"
  cluster         = aws_ecs_cluster.opsflow_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets = [
      aws_subnet.public_subnet.id,
      aws_subnet.public_subnet_2.id
    ]

    security_groups  = [aws_security_group.opsflow_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_tg.arn
    container_name   = "frontend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.http_listener]
}

resource "aws_cloudwatch_log_group" "backend_logs" {
  name              = "/ecs/${var.project_name}-backend"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "backend_task" {
  family                   = "${var.project_name}-backend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${var.dockerhub_username}/opsflow-backend:latest"
      essential = true

      portMappings = [
        {
          containerPort = 5050
          hostPort      = 5050
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "DB_HOST", value = aws_db_instance.opsflow_db.address },
        { name = "DB_USER", value = "postgres" },
        { name = "DB_PASSWORD", value = "password12345" },
        { name = "DB_NAME", value = "opsflow" },
        { name = "DB_PORT", value = "5432" },
        { name = "JWT_SECRET", value = "opsflow_super_secret_key" }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.backend_logs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "backend"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "backend_service" {
  name            = "${var.project_name}-backend-service"
  cluster         = aws_ecs_cluster.opsflow_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets = [
      aws_subnet.public_subnet.id,
      aws_subnet.public_subnet_2.id
    ]

    security_groups  = [aws_security_group.opsflow_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "backend"
    container_port   = 5050
  }

  depends_on = [aws_lb_listener_rule.api_rule]
}