terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_instance" "qrgen_test" {
  ami = "ami-0a2e29e3b4fc39212"
  instance_type = "t2.micro"
  root_block_device {
    volume_size = 30 
    volume_type = "gp2"
  }
  tags = {
    Name = "memory-ball30"
  }
}