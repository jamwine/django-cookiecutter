# {{ cookiecutter.project_name }}

{{ cookiecutter.project_short_description }}

## Quick Start 🚀

This project is built with Docker and includes multiple services. Here's how to get started:

### First-time Setup

1. Ensure you have the following installed:
   - Docker & Docker Compose
   - Make (optional, but recommended)
   - Python {{ cookiecutter.python_version }}+ (for local development)

2. Clone the repository:
```bash
git clone <your-repo-url>
cd {{ cookiecutter.project_name }}
```

3. Review environment variables:
```bash
# Copy example environment files
cat .envs/.local/.django
cat .envs/.local/.postgres

# Generate a new secret key and update variables (if needed)
make generate-secret-key
```

4. Build and start the services:
```bash
make build  # First time build
make up     # Start services
```

Your project is now running! Access it at:
- API: http://localhost:8000/
- Admin Dashboard: http://localhost:8000/{{ cookiecutter.admin_url }}
- API Documentation: http://localhost:8000/api/schema/swagger-ui/
- Frontend: http://localhost:3000/

## Development Guide 💻

### Project Structure

```
.
├── django_apps/                # Django applications
│   ├── users/                 # User management
│   ├── core/                  # Core functionality
│   └── api/                   # API endpoints
├── client/                    # React frontend
├── docker/                    # Docker configurations
└── requirements/              # Python dependencies
```

### Common Development Tasks

#### Database Operations

```bash
# Create and apply migrations
make makemigrations
make migrate

# Create superuser
make superuser

# Reset database
make reset-db

# Access database CLI
make access-db

# Backup database
make backup-db

# Show available backups
make show-backups

# Restore from backup
make restore-db backup_id=<backup_id>
```

#### Code Quality

```bash
# Format code (black + isort)
make black
make isort

# Check formatting
make black-check
make isort-check

# Run linting
make flake8

# Run all pre-commit hooks
pre-commit run --all-files
```

#### Development Server

```bash
# View logs
make show-logs        # All services
make show-logs-api    # Only Django API

# Restart services
make restart

# Stop all services
make down
```

#### Creating New Apps

```bash
make django-startapp app_name=your_app_name
```

Then register your app in `django_apps/core/settings/base.py`:
```python
LOCAL_APPS = [
    "django_apps.your_app_name.apps.YourAppNameConfig",
    # ...
]
```

### Working with Celery

This project uses Celery for background task processing:

1. Define tasks in `django_apps/your_app/tasks.py`:
```python
from celery import shared_task

@shared_task
def your_task():
    pass
```

2. Monitor tasks at http://localhost:5555 (Flower)

### Email Testing

In development, emails are captured by MailHog:
- Web interface: http://localhost:8025
- SMTP port: 1025

### Jupyter Notebooks

For data analysis or debugging:
```bash
# Start Jupyter
make django-shell

# Access at: http://localhost:8890
```

## API Documentation 📚

- Swagger UI: http://localhost:8000/api/schema/swagger-ui/
- ReDoc: http://localhost:8000/api/schema/redoc/
- OpenAPI Schema: http://localhost:8000/api/schema/

## Testing 🧪

```bash
# Run all tests
docker-compose -f local.yml run --rm api pytest

# Run specific tests
docker-compose -f local.yml run --rm api pytest path/to/test.py

# Run tests with coverage
docker-compose -f local.yml run --rm api pytest --cov
```

## Deployment 🚀

### Prerequisites

1. Set up production environment variables:
```bash
cp .envs/.production/.django.example .envs/.production/.django
cp .envs/.production/.postgres.example .envs/.production/.postgres
```

2. Update production settings:
   - Set `DJANGO_SETTINGS_MODULE` to `django_apps.core.settings.production`
   - Configure proper email backend
   - Set up proper database credentials
   - Configure Redis for caching

### Deployment Commands

```bash
# Build production images
docker-compose -f production.yml build

# Run production stack
docker-compose -f production.yml up -d
```

## Project Information

- Admin: {{ cookiecutter.admin_name }}
- Contact: {{ cookiecutter.admin_email }}
- Version: {{ cookiecutter.version }}

## Contributing

1. Create a feature branch:
```bash
git checkout -b feature/amazing-feature
```

2. Install pre-commit hooks:
```bash
pip install pre-commit
pre-commit install
```

3. Make your changes and ensure:
   - Tests pass (`pytest`)
   - Code is formatted (`make black isort`)
   - Linting passes (`make flake8`)

4. Submit a pull request

## Troubleshooting 🔧

### Common Issues

1. **Port conflicts**
   ```bash
   # Check for port usage
   sudo lsof -i :8000
   # Stop conflicting service or change port in local.yml
   ```

2. **Database reset**
   ```bash
   make down-v  # Stop and remove volumes
   make reset-db  # Reset database
   ```

3. **Dependency issues**
   ```bash
   # Rebuild with no cache
   docker-compose -f local.yml build --no-cache
   ```

### Getting Help

- Check the logs: `make show-logs`
- Review error messages in the browser console
- Ensure all environment variables are set correctly
- Verify Docker containers are running: `docker ps`

## License

This project is licensed under the MIT License. 