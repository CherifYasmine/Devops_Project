provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "~>2.8.0"

    }
  }
   backend "azurerm" {
    resource_group_name = "deployment-automation123"
    storage_account_name = "backendterraform123"
    container_name = "backendterraform"
    key = "ingress.terraform.tfstate"
  }
}

