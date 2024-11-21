variable "region" {
  description = "A região do GCP onde os recursos serão criados"
  default     = "us-central1"
}

variable "instance_type" {
  description = "O tipo de instância a ser utilizado"
  default     = "e2-micro"
}

variable "image" {
  description = "Nome da imagem a ser utilizada"
}

variable "project" {
  description = "ID do projeto GCP"
}

variable "db_user" {
  description = "Usuário do banco de dados"
}

variable "db_password" {
  description = "Senha do banco de dados"
}

variable "db_name" {
  description = "Nome do banco de dados"
}
