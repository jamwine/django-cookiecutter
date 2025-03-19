# Django Project Cookiecutter Template

A production-ready Django project template with Docker support, featuring a modern tech stack and best practices.

## Features

- **Docker-based Development**: Full Docker integration with separate services for Django, PostgreSQL, Redis, Celery, and more
- **Modern Stack**:
  - Django 4.1+ & Django REST Framework
  - PostgreSQL for database
  - Redis for caching and message broker
  - Celery for background tasks with Flower monitoring
  - MailHog for email testing in development
  - Nginx as reverse proxy
  - JWT Authentication
  - Swagger/OpenAPI documentation
- **Development Tools**:
  - Django Debug Toolbar
  - Django Extensions
  - Jupyter Notebooks integration
  - Pre-commit hooks for code quality
  - Black, isort, and flake8 for code formatting
  - pytest for testing
  - Coverage reporting

## Detailed Setup Guide

### 1. Prerequisites

- Python 3.11+
- Docker and Docker Compose
- Git
- Make (optional, but recommended)

### 2. Creating Your Project

You can create your project in two ways:

1. Install Cookiecutter:
```bash
pip install cookiecutter
```

2. Generate your project using one of these options:
   - **Option 1**: Directly from GitHub Repository:
   ```bash
   cookiecutter https://github.com/jamwine/django-cookiecutter
   ```
   - **Option 2**: Using local directory after cloning the repository:
   ```bash
   git clone https://github.com/jamwine/django-cookiecutter.git
   cookiecutter django-cookiecutter
   ```

3. You'll be prompted for various project settings, including secret keys:
   - Generate your own secret key by running: `python -c 'import secrets; print(secrets.token_urlsafe(38))'` in a separate terminal
   - Alternatively, you can skip this step and set secret keys later by running `make generate-secret-key`
```
project_name [django_project_name]: myproject
admin_name [Admin]: John Doe
admin_email [admin@admin.com]: john@example.com
admin_url [admin/]: dashboard/
project_short_description [Short description]: My awesome Django project
version [0.1.0]: 0.1.0
python_version [3.11.2]: 3.11.2
```

4. Review and update your environment variables as needed:
```bash
cat .envs/.local/.django
cat .envs/.local/.postgres
```

### 3. Development Workflow

#### Building and Running the Project

```bash
# Build and start all services
make build

# Start services
make up

# Stop services
make down

# Restart services
make restart

# View logs
make show-logs        # All services
make show-logs-api    # Only Django API
```

#### Database Operations

```bash
# Create migrations
make makemigrations

# Apply migrations
make migrate

# Reset database
make reset-db

# Create superuser
make superuser

# Access database
make access-db

# Backup database
make backup-db

# Show available backups
make show-backups

# Restore from backup
make restore-db backup_id=<backup_id>
```

#### Code Quality and Testing

```bash
# Format code
make black
make isort

# Check formatting
make black-check
make isort-check

# Run linter
make flake8

# Run tests (after implementing pytest.ini)
docker-compose -f local.yml run --rm api pytest
```

#### Development Tools

```bash
# Start Django shell
make django-shell

# Create new Django app
make django-startapp app_name=myapp

# Collect static files
make collectstatic
```

### 4. Accessing Services

- Django API: http://localhost:8000
- Django Admin: http://localhost:8000/admin
- Redoc Documentation: http://localhost:8000/redoc/
- Frontend (React): http://localhost:1337/
- Jupyter Server: http://localhost:8890/
- Flower (Celery monitoring): http://localhost:5555
- MailHog (Email testing): http://localhost:8025

## Project Structure

```
{{ cookiecutter.project_name }}/
├── django_apps/                # Django applications directory
│   ├── users/                 # Custom user app
│   ├── core/                  # Core functionality
│   └── api/                   # API-specific code
│
├── client/                    # Frontend application (React)
│   ├── src/                  # Source files
│   └── package.json          # Frontend dependencies
│
├── docker/                    # Docker configuration
│   ├── local/                # Development environment
│   │   ├── django/          # Django Dockerfile and scripts
│   │   ├── postgres/        # PostgreSQL Dockerfile and scripts
│   │   └── nginx/           # Nginx configuration
│   └── production/          # Production environment
│
├── requirements/              # Python dependencies
│   ├── base.txt             # Base requirements
│   ├── local.txt            # Development requirements
│   └── production.txt       # Production requirements
│
├── .envs/                    # Environment variables
│   ├── .local/              # Development environment
│   └── .production/         # Production environment
│
├── {{ cookiecutter.project_name }}/  # Django project configuration
│   ├── settings/            # Settings files
│   ├── urls.py             # URL configuration
│   └── wsgi.py             # WSGI configuration
│
├── django-jupyter-notebooks/ # Jupyter notebooks for development
├── mediafiles/              # User-uploaded files
├── staticfiles/             # Static files
├── manage.py               # Django management script
├── local.yml              # Docker Compose for development
├── production.yml         # Docker Compose for production
├── Makefile              # Development automation
├── pytest.ini            # pytest configuration
├── setup.cfg             # Python tools configuration
└── .pre-commit-config.yaml  # pre-commit hooks configuration
```

### Key Files Explained

- `local.yml`: Docker Compose configuration for development environment
- `Makefile`: Contains all the commands needed for development
- `.pre-commit-config.yaml`: Git hooks for code quality checks
- `pytest.ini`: Test configuration
- `setup.cfg`: Configuration for various Python tools
- `requirements/*.txt`: Python package dependencies
- `.envs/`: Environment variables (not committed to git)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install pre-commit hooks:
```bash
pip install pre-commit
pre-commit install
```
4. Make your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 