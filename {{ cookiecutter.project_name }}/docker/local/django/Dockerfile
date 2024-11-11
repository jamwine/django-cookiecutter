# Define the base image with the specified Python version
ARG PYTHON_VERSION=3.11.2-bullseye
FROM python:${PYTHON_VERSION} as python

# Build stage
FROM python as python-build-stage
ARG BUILD_ENVIRONMENT=local

# Install build dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and build wheels
COPY ./requirements /requirements
RUN pip wheel --wheel-dir /wheels -r /requirements/${BUILD_ENVIRONMENT}.txt

# Runtime stage
FROM python as python-run-stage

# Set environment variables
ENV APP_HOME=/app \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    BUILD_ENV=${BUILD_ENVIRONMENT}

# Create application directories
RUN mkdir -p $APP_HOME/staticfiles

# Set the working directory
WORKDIR ${APP_HOME}

# Install runtime dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
  libpq-dev \
  gettext \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# Copy built wheels and install them
COPY --from=python-build-stage /wheels /wheels/
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
  && rm -rf /wheels/

# Copy entrypoint and start scripts
COPY ./docker/local/django/entrypoint /entrypoint
COPY ./docker/local/django/start /start
COPY ./docker/local/django/celery/worker/start /start-celeryworker
COPY ./docker/local/django/celery/flower/start /start-flower

# Fix line endings and make scripts executable
RUN sed -i 's/\r$//g' /entrypoint /start /start-celeryworker /start-flower \
  && chmod +x /entrypoint /start /start-celeryworker /start-flower

# Copy the application code
COPY . ${APP_HOME}

# Set the entrypoint
ENTRYPOINT [ "/entrypoint" ]