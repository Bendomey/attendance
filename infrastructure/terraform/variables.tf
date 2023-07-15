# Google Variables
variable "google_project" {
    description = "The Google Cloud project to deploy resources to"
    type        = string
}

# VM Variables

variable "zone_name" {
  description = "The zone to deploy resources to"
  type        = string
  default     = "us-west1-a"
}

variable "machine_type" {
  description = "The machine type to use for the VM"
  type        = string
  default     = "f1-micro"
}

variable "vm_name" {
  description = "The name of the VM"
  type        = string
  default     = "attendance-vm"
}


# Network Variables

variable "vpc_network_name" {
    description = "The name of the VPC network"
    type        = string
    default     = "attendance-network"
}

variable "vpc_subnetwork_name" {
    description = "The name of the VPC subnetwork"
    type        = string
    default     = "attendance-subnetwork"
}

variable "vpc_subnetwork_region" {
    description = "The region of the VPC subnetwork"
    type        = string
    default     = "us-west1"
}
