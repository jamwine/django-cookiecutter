FROM postgres:15-bullseye


COPY ./docker/local/postgres/maintenance /usr/local/bin/maintenance

RUN chmod +x /usr/local/bin/maintenance/*

# convert line endings to unix
RUN find /usr/local/bin/maintenance -type f -exec sed -i 's/\r$//g' {} +

# Move scripts
RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
  && rmdir /usr/local/bin/maintenance
