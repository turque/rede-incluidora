#!/bin/bash

# Função para executar comandos remotamente via SSH
executar_remoto() {
  ssh -tt -v -i ~/.ssh/dev-aws.pem $usuario@$ip <<EOF
set -x
$1
EOF
}

# Função para configuração básica
configuracao_basica() {
  executar_remoto "
    sudo apt update &&
    sudo apt upgrade -y &&
    sudo apt install nginx -y &&
    sudo systemctl start nginx &&
    sudo systemctl enable nginx &&
    sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOL
    sudo nginx -t &&
    sudo systemctl restart nginx
  "
  echo "Configuração básica concluída."
}

# Função para configuração de frontend
configuracao_frontend() {
  configuracao_basica

  executar_remoto "
    sudo apt install -y nodejs npm &&
    npx create-next-app@latest my-next-app &&
    sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL
    sudo nginx -t &&
    sudo systemctl restart nginx &&
    sudo tee /etc/systemd/system/app.socket > /dev/null <<EOL
[Unit]
Description=app socket

[Socket]
ListenStream=/run/app.sock

[Install]
WantedBy=sockets.target
EOL
  "
  echo "Configuração de frontend concluída."
}

# Função para configuração de backend
configuracao_backend() {
  configuracao_basica

  executar_remoto "
    sudo apt install -y python3 python3-pip &&
    pip3 install fastapi uvicorn &&
    sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL
    sudo nginx -t &&
    sudo systemctl restart nginx &&
    mkdir -p /home/ubuntu/app &&
    sudo tee /etc/systemd/system/app.socket > /dev/null <<EOL
[Unit]
Description=app socket

[Socket]
ListenStream=/run/app.sock

[Install]
WantedBy=sockets.target
EOL
  "

  # Copiar o conteúdo da pasta 'backend' e o arquivo '.env' para o servidor remoto
  scp -i ~/.ssh/sua_chave.pem -r ../backend $usuario@$ip:/home/ubuntu/app
  scp -i ~/.ssh/sua_chave.pem ../backend/.env $usuario@$ip:/home/ubuntu/app

  echo "Configuração de backend concluída."
}

# Função para configuração de database
configuracao_database() {
  configuracao_basica

  read -p "Informe o nome do usuário do PostgreSQL: " pg_user
  read -sp "Informe a senha do usuário do PostgreSQL: " pg_password
  echo

  executar_remoto "
    sudo apt install -y postgresql postgresql-contrib &&
    sudo -u postgres psql -c \"CREATE USER $pg_user WITH PASSWORD '$pg_password';\" &&
    sudo -u postgres psql -c \"ALTER USER $pg_user WITH SUPERUSER;\" &&
    sudo -u postgres psql -c \"CREATE DATABASE rede_incluidora OWNER $pg_user;\"
  "
  echo "Configuração de database concluída."
}

# Menu de seleção
read -p "Informe o usuário do servidor remoto: " usuario
read -p "Informe o IP do servidor remoto: " ip

echo "Escolha o tipo de instalação:"
echo "1) Frontend"
echo "2) Backend"
echo "3) Database"
read -p "Opção: " opcao

case $opcao in
  1)
    configuracao_frontend
    ;;
  2)
    configuracao_backend
    ;;
  3)
    configuracao_database
    ;;
  *)
    echo "Opção inválida."
    ;;
esac
