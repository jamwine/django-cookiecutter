FROM postgres:15-bullseye

# Create directory for configuration files
RUN mkdir -p /etc/postgresql/

# Copy configuration files
COPY ./docker/local/postgres/postgresql.conf /etc/postgresql/
COPY ./docker/local/postgres/pg_hba.conf /etc/postgresql/

# Copy and setup maintenance scripts
COPY ./docker/local/postgres/maintenance /usr/local/bin/maintenance
COPY ./docker/local/postgres/init-user-db.sh /docker-entrypoint-initdb.d/

# Set proper permissions
RUN chmod +x /usr/local/bin/maintenance/*
RUN chmod +x /docker-entrypoint-initdb.d/init-user-db.sh

# Convert line endings to unix
RUN find /usr/local/bin/maintenance -type f -exec sed -i 's/\r$//g' {} +
RUN sed -i 's/\r$//g' /docker-entrypoint-initdb.d/init-user-db.sh

# Move scripts
RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
    && rmdir /usr/local/bin/maintenance

# Set proper permissions for config files
RUN chown postgres:postgres /etc/postgresql/postgresql.conf \
    && chown postgres:postgres /etc/postgresql/pg_hba.conf \
    && chmod 600 /etc/postgresql/postgresql.conf \
    && chmod 600 /etc/postgresql/pg_hba.conf

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf", "-c", "hba_file=/etc/postgresql/pg_hba.conf"]