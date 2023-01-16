provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.31.0"
    }
  }
   backend "azurerm" {
    resource_group_name = "deployment-automation123"
    storage_account_name = "backendterraform123"
    container_name = "backendterraform"
    key = "dev.terraform.tfstate"
  }
}