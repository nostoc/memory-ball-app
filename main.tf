terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

# Create a key pair for SSH access (or use an existing one)
resource "aws_key_pair" "jenkins_ssh_key" {
  key_name   = "jenkins-memoryball-key"
  public_key = file("/home/nostoc/.ssh/id_rsa.pub")  # Use existing pubkey
}

resource "aws_instance" "memoryball_test" {
  ami                    = "ami-0a2e29e3b4fc39212"  # Ubuntu 22.04 LTS in ap-southeast-2
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.jenkins_ssh_key.key_name  # Assign the key pair
  vpc_security_group_ids = [aws_security_group.memoryball_sg.id]       # Allow SSH access

  root_block_device {
    volume_size = 30
    volume_type = "gp2"
  }

  tags = {
    Name = "memoryballTest30"
  }
}

# Security group to allow SSH (port 22)
resource "aws_security_group" "memoryball_sg" {
  name        = "memoryball-allow-ssh"
  description = "Allow SSH access from Jenkins"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Restrict to your Jenkins IP in production!
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Output the instance public IP for Ansible
output "instance_ip" {
  value = aws_instance.memoryball_test.public_ip
}