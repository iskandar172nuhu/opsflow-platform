resource "aws_db_subnet_group" "opsflow_db_subnet_group" {
  name = "${var.project_name}-db-subnet-group"

  subnet_ids = [
    aws_subnet.public_subnet.id,
    aws_subnet.public_subnet_2.id
  ]

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_db_instance" "opsflow_db" {
  identifier             = "${var.project_name}-postgres-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = "opsflow"
  username               = "postgres"
  password               = "password12345"
  port                   = 5432
  publicly_accessible    = false
  skip_final_snapshot    = true
  db_subnet_group_name   = aws_db_subnet_group.opsflow_db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.opsflow_sg.id]

  tags = {
    Name = "${var.project_name}-postgres-db"
  }
}