terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.73.0"
    }
  }
}

provider "google" {
  credentials = file("/Users/domeybenjamin/.config/gcloud/application_default_credentials.json")
  project = var.google_project
}