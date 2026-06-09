output "vpc_id" {
  value = aws_vpc.opsflow_vpc.id
}

output "subnet_id" {
  value = aws_subnet.public_subnet.id
}

output "server_public_ip" {
  value = aws_instance.opsflow_server.public_ip
}

output "elastic_ip" {
  value = aws_eip.opsflow_eip.public_ip
}