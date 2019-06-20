.PHONY: help build

BLUEBOLD=\033[1;34m
BLUE=\033[0;36m
PURPLE=\033[0;35m
GREENBOLD=\033[1;32m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m
BOLD=\033[1m

DOCKER_VERSION?=0.00.01
DOCKER_REGISTRY_ADRESS?=docker.registry.io
DEFAULT_BRANCH?=dev
ROOT_FOLDER?=..

help:
	@echo " ${BLUEBOLD} __    _____ _____ _____ _____ _____ ${NC}"
	@echo " ${BLUEBOLD}|  |  |  _  |   __|  |  | __  |     |${NC}"
	@echo " ${BLUEBOLD}|  |__|     |  |  |  |  |    -|  |  |${NC}"
	@echo " ${BLUEBOLD}|_____|__|__|_____|_____|__|__|_____|${NC}"
	@echo " ${BLUEBOLD}Swamerai${NC} commands to make your life 'really easy peasy!'"
	@echo "   "
	@echo "   start, stop, build and clean"

start:
	docker-compose up -d es kibana redis s3
	docker ps

stop:
	docker-compose stop swamerai es kibana redis s3
	docker ps

build:
	docker-compose up -d --build es kibana redis s3
	docker ps

clean: stop
	docker-compose rm -f es kibana redis s3 swamerai


