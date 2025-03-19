# Port Configuration Guide

## Overview

This project uses a simplified port configuration where all services are accessed through a single entry point (Nginx) on port 80. This makes the application easier to use and more similar to a production environment.

## Port Structure

### Main Application Port
- **Port 80**: Main application entry point (Nginx)
  - Access the application at `http://localhost`
  - Nginx routes requests internally to appropriate services

### Development Services
The following services are available but only accessible through Nginx:

- **Frontend (Next.js)**: Internal port 3000
  - Served through Nginx at `http://localhost`
  - Hot reloading and development features are preserved

- **Backend (Django)**: Internal port 8000
  - API endpoints available at `http://localhost/api`
  - Admin interface at `http://localhost/admin`
  - Health check at `http://localhost/health`

### Additional Services
Some additional services are exposed for development purposes:

- **Jupyter Lab**: Port 8890
  - Access at `http://localhost:8890`
  - Used for interactive Python development

### Internal Services (Not Directly Accessible)
These services are used internally and not exposed to the host machine:

- **PostgreSQL**: Port 5432 (internal)
- **Redis**: Port 6379 (internal)
- **Mailhog**: Port 8025 (internal)
  - Access through Nginx at `http://localhost/mailhog`
- **Flower**: Port 5555 (internal)
  - Access through Nginx at `http://localhost/flower`

## Benefits of This Configuration

1. **Simplified Access**: All services are accessed through a single port (80)
2. **Production-Like Environment**: The setup mirrors a production environment where all traffic goes through Nginx
3. **Secure**: Internal services are not directly exposed to the host machine
4. **Easy to Remember**: No need to remember multiple port numbers
5. **Reduced Port Conflicts**: Fewer exposed ports means less chance of conflicts with other applications

## Development Workflow

1. Start the application:
   ```bash
   docker-compose -f local.yml up
   ```

2. Access the services:
   - Main application: `http://localhost`
   - API documentation: `http://localhost/api/docs`
   - Admin interface: `http://localhost/admin`
   - Jupyter Lab: `http://localhost:8890`
   - Mailhog: `http://localhost/mailhog`
   - Flower: `http://localhost/flower`

## Troubleshooting

If port 80 is already in use on your system:
1. Stop any other services using port 80 (common culprits: Apache, IIS)
2. Or modify the Nginx port in `local.yml` to use a different port (e.g., 8080) 