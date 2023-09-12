help:
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-30s\033[0m %s\n", $$1, $$2}'
build: ## Build Docker images defined in the Compose file.
	docker-compose build
up: ## Start containers defined in the Compose file in detached mode.
	docker-compose up -d
start: ## Start containers defined in the Compose file.
	docker-compose start
stop: ## Stop containers defined in the Compose file
	docker-compose stop
down: ## Stop and remove containers, networks, and volumes defined in the Compose file.
	docker-compose down
destroy: ## Stop and remove containers, networks, volumes, and their associated data volumes defined in the Compose file.
	docker-compose down -v