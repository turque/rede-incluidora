variable "region" {
  description = "A região da AWS onde os recursos serão criados"
  default     = "us-east-1"
}

variable "instance_type" {
  description = "O tipo de instância a ser utilizado"
  default     = "t2.micro"
}

variable "ami" {
  description = "ID da AMI a ser utilizada"
}

variable "my_ip" {
  description = "Seu endereço IP para acesso SSH"
}
