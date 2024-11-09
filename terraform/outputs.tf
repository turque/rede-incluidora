output "frontend_instance_id" {
  description = "ID da instância EC2 do frontend"
  value       = aws_instance.frontend.id
}

output "frontend_instance_public_ip" {
  description = "Endereço IP público da instância EC2 do frontend"
  value       = aws_eip.frontend_ip.public_ip
}

output "backend_instance_id" {
  description = "ID da instância EC2 do backend"
  value       = aws_instance.backend.id m
}

output "backend_instance_private_ip" {
  description = "Endereço IP privado da instância EC2 do backend"
  value       = aws_instance.backend.private_ip
}

output "database_instance_id" {
  description = "ID da instância EC2 do banco de dados"
  value       = aws_instance.database.id
}

output "database_instance_private_ip" {
  description = "Endereço IP privado da instância EC2 do banco de dados"
  value       = aws_instance.database.private_ip
}
