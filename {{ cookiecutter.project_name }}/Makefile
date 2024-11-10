# Path to the environment file
POSTGRES_ENV_FILE_PATH := /.envs/.local/.postgres
DJANGO_ENV_FILE_PATH := /.envs/.local/.django

# Load environment variables from the specified file
ifneq (,$(wildcard $(POSTGRES_ENV_FILE_PATH)))
    include $(POSTGRES_ENV_FILE_PATH)
    export $(shell sed 's/=.*//' $(POSTGRES_ENV_FILE_PATH))
endif

ifneq (,$(wildcard $(DJANGO_ENV_FILE_PATH)))
    include $(DJANGO_ENV_FILE_PATH)
    export $(shell sed 's/=.*//' $(DJANGO_ENV_FILE_PATH))
endif

# Define variables
PG_USERNAME := $(POSTGRES_USER)
DB_NAME := $(POSTGRES_DB)

# Docker Compose file
COMPOSE_FILE := local.yml

# Docker Compose commands
DOCKER_COMPOSE := docker compose -f $(COMPOSE_FILE)

# Phony targets
.PHONY: build up down restart backup-db show-backups restore-db show-logs show-logs-api django-startapp django-shell makemigrations migrate make-migrate collectstatic superuser down-v volume reset-db access-db terminate-db-sessions flake8 black-check black-diff black isort-check isort-diff isort generate_secret_key help 

# Targets
build: ## Build and start the containers
	$(DOCKER_COMPOSE) up --build -d --remove-orphans

up: ## Start the containers
	$(DOCKER_COMPOSE) up -d

down: ## Stop the containers
	$(DOCKER_COMPOSE) down

restart: ## Restart the containers
	@$(MAKE) down
	@$(MAKE) up

backup-db: ## Backup the database
	$(DOCKER_COMPOSE) exec postgres backup

show-backups: ## Show database backups
	$(DOCKER_COMPOSE) exec postgres backups

restore-db: ## Restore the database from a backup
	$(DOCKER_COMPOSE) exec postgres restore ${backup_id}

show-logs: ## Show logs for all services
	$(DOCKER_COMPOSE) logs

show-logs-api: ## Show logs for the API service
	$(DOCKER_COMPOSE) logs api

django-startapp: ## Create a new Django app
	$(DOCKER_COMPOSE) run --rm api python manage.py startapp $(app_name)

django-shell: ## Open the Django shell
	$(DOCKER_COMPOSE) run --rm api python manage.py shell

makemigrations: ## Make database migrations
	$(DOCKER_COMPOSE) run --rm api python manage.py makemigrations

migrate: ## Apply database migrations
	$(DOCKER_COMPOSE) run --rm api python manage.py migrate --run-syncdb

make-migrate: ## Make and apply database migrations
	@$(MAKE) makemigrations
	@$(MAKE) migrate

collectstatic: ## Collect static files
	$(DOCKER_COMPOSE) run --rm api python manage.py collectstatic --no-input --clear

superuser: ## Create a superuser
	$(DOCKER_COMPOSE) run --rm api python manage.py createsuperuser

down-v: ## Stop the containers and remove volumes
	$(DOCKER_COMPOSE) down -v

volume: ## Inspect the database volume
	$(DOCKER_COMPOSE) volume inspect {{ cookiecutter.project_name }}_local_postgres_data

reset-db: ## Reset the database
	@$(DOCKER_COMPOSE) exec postgres psql --username=$(PG_USERNAME) --dbname=postgres -c "DROP DATABASE IF EXISTS $(DB_NAME);"
	@$(DOCKER_COMPOSE) exec postgres psql --username=$(PG_USERNAME) --dbname=postgres -c "CREATE DATABASE $(DB_NAME);"
	@$(MAKE) make-migrate

access-db: ## Access the database
	$(DOCKER_COMPOSE) exec postgres psql --username=${PG_USERNAME} --dbname=${DB_NAME}

terminate-db-sessions: ## Terminate all database sessions
	$(DOCKER_COMPOSE) exec postgres psql --username=${PG_USERNAME} --dbname=${DB_NAME} -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$(DB_NAME)' AND pid <> pg_backend_pid();"

flake8: ## Run flake8
	$(DOCKER_COMPOSE) exec api flake8 .

black-check: ## Run black in check mode
	$(DOCKER_COMPOSE) exec api black --check --exclude=migrations .

black-diff: ## Run black in diff mode
	$(DOCKER_COMPOSE) exec api black --diff --exclude=migrations .

black: ## Run black
	$(DOCKER_COMPOSE) exec api black --exclude=migrations .

isort-check: ## Run isort in check mode
	$(DOCKER_COMPOSE) exec api isort . --check-only --skip venv --skip migrations

isort-diff: ## Run isort in diff mode
	$(DOCKER_COMPOSE) exec api isort . --diff --skip venv --skip migrations

isort: ## Run isort
	$(DOCKER_COMPOSE) exec api isort . --skip venv --skip migrations

generate-secret-key: ## Generate a secret key
	python -c "import secrets; print(secrets.token_urlsafe(38))"

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Default target
.DEFAULT_GOAL := help