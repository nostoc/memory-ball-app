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

# Security Group restricting SSH access to only your Jenkins VPS
resource "aws_security_group" "memory_ball_sg" {
  name        = "memory-ball-sg"
  description = "Allow SSH from Jenkins VPS and necessary ports"

  ingress {
    description = "SSH from Jenkins VPS"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["15.235.141.237/32"] # Your VPS IP
  }

  ingress {
    description = "HTTP access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "memory-ball-sg"
  }
}

resource "aws_instance" "memry_ball_test" {
  ami           = "ami-0a2e29e3b4fc39212"  # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  key_name      = "your-aws-key-pair-name"  # Add your AWS key pair name here
  
  vpc_security_group_ids = [aws_security_group.memory_ball_sg.id]

  root_block_device {
    volume_size = 30 
    volume_type = "gp2"
    tags = {
      Name = "memory-ball-root-volume"
    }
  }
  
  tags = {
    Name = "memory-ball30"
  }

  # Ensure cloud-init completes before Ansible runs
  user_data = <<-EOF
              #!/bin/bash
              echo "Instance ready for configuration"
              EOF
}

output "server_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.memry_ball_test.public_ip
}

output "ansible_inventory" {
  description = "Generated Ansible inventory entry"
  value       = <<EOT
[webserver]
${aws_instance.memry_ball_test.public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=/home/nostoc/.ssh/your-key.pem
EOT
  sensitive   = true
}

output "instance_details" {
  description = "All instance details for debugging"
  value       = {
    public_ip  = aws_instance.memry_ball_test.public_ip
    instance_id = aws_instance.memry_ball_test.id
    az          = aws_instance.memry_ball_test.availability_zone
  }
}