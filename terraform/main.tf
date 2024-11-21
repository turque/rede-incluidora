provider "google" {
  project     = var.project
  region      = var.region
  credentials = file("~/.config/gcloud/application_default_credentials.json")
}

resource "google_compute_network" "vpc_network" {
  name = "rede-incluidora-vpc"
}

resource "google_compute_subnetwork" "public" {
  name          = "rede-incluidora-public-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_subnetwork" "private" {
  name          = "rede-incluidora-private-subnet"
  ip_cidr_range = "10.0.2.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "frontend_sg" {
  name    = "frontend-sg"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "backend_sg" {
  name    = "backend-sg"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }

  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_instance" "frontend" {
  name         = "rede-incluidora-frontend-instance"
  machine_type = var.instance_type
  zone         = "${var.region}-a"

  boot_disk {
    initialize_params {
      image = var.image
    }
  }

  network_interface {
    network    = google_compute_network.vpc_network.id
    subnetwork = google_compute_subnetwork.public.id

    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y nodejs npm
              # Comandos adicionais para configurar o Next.js
              EOF
}

resource "google_compute_instance" "backend" {
  name         = "rede-incluidora-backend-instance"
  machine_type = var.instance_type
  zone         = "${var.region}-a"

  boot_disk {
    initialize_params {
      image = var.image
    }
  }

  network_interface {
    network    = google_compute_network.vpc_network.id
    subnetwork = google_compute_subnetwork.public.id

    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y python3 python3-pip
              pip3 install fastapi uvicorn
              # Comandos adicionais para configurar o FastAPI
              EOF
}

resource "google_compute_instance" "database" {
  name         = "rede-incluidora-database-instance"
  machine_type = var.instance_type
  zone         = "${var.region}-a"

  boot_disk {
    initialize_params {
      image = var.image
    }
  }

  network_interface {
    network    = google_compute_network.vpc_network.id
    subnetwork = google_compute_subnetwork.public.id

    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y postgresql postgresql-contrib
              sudo -u postgres psql -c "CREATE USER ${var.db_user} WITH PASSWORD '${var.db_password}';"
              sudo -u postgres psql -c "CREATE DATABASE ${var.db_name} OWNER ${var.db_user};"
              # Comandos adicionais para configurar o PostgreSQL
              EOF
}
