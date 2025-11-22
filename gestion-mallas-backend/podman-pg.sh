#!/usr/bin/bash

podman run \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v "$(pwd)"/database:/var/lib/postgresql/18/data:Z \
  -d postgres \
  docker.io/library/postgres:18
