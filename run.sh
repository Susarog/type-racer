#!/bin/bash

# Function to bring up Docker containers
docker_compose_up() {
  docker compose -f "$1" up -d 
}

# Function to bring down Docker containers
docker_compose_down() {
  docker compose -f "$1" down --volumes --remove-orphans
}

# Check the command line argument
if [ "$2" == "up" ]; then
    
    docker_compose_up $1
elif [ "$2" == "down" ]; then
    docker_compose_down $1
else
    echo "Usage: $0 [up|down]"
    exit 1
fi
