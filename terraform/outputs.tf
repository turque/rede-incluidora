output "frontend_instance_id" {
  description = "ID da instância do frontend"
  value       = google_compute_instance.frontend.id
}

output "frontend_instance_public_ip" {
  description = "Endereço IP público da instância do frontend"
  value       = google_compute_instance.frontend.network_interface[0].access_config[0].nat_ip
}

output "backend_instance_id" {
  description = "ID da instância do backend"
  value       = google_compute_instance.backend.id
}

output "backend_instance_private_ip" {
  description = "Endereço IP privado da instância do backend"
  value       = google_compute_instance.backend.network_interface[0].network_ip
}

output "database_instance_id" {
  description = "ID da instância do banco de dados"
  value       = google_compute_instance.database.id
}

output "database_instance_private_ip" {
  description = "Endereço IP privado da instância do banco de dados"
  value       = google_compute_instance.database.network_interface[0].network_ip
}
