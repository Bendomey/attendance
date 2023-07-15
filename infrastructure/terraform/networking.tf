# Create A Virtual Private Cloud network and subnet for the VM's network interface.
resource "google_compute_network" "vpc_network" {
  name                    = var.vpc_network_name
  auto_create_subnetworks = false
  mtu                     = 1460
}

resource "google_compute_subnetwork" "default" {
  name          = var.vpc_subnetwork_name
  ip_cidr_range = "10.0.1.0/24"
  region        = var.vpc_subnetwork_region
  network       = google_compute_network.vpc_network.id
}

# Add a custom SSH firewall rule
resource "google_compute_firewall" "ssh" {
  name = "allow-ssh"
  allow {
    ports    = ["22"]
    protocol = "tcp"
  }
  direction     = "INGRESS"
  network       = google_compute_network.vpc_network.id
  priority      = 1000
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["ssh"]
}

# Open port 5001 on the VM

resource "google_compute_firewall" "app" {
  name    = "app-firewall"
  network = google_compute_network.vpc_network.id

  allow {
    protocol = "tcp"
    ports    = ["5001"]
  }
  source_ranges = ["0.0.0.0/0"]
}
