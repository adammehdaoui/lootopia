# For local development
FROM mcr.microsoft.com/mssql/server:latest

USER root

EXPOSE 1433

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd
ENV MSSQL_SSL_CERT_TRUST=0

RUN apt-get update && apt-get install -y \
    curl \
    apt-transport-https \
    && curl https://packages.microsoft.com/keys/microsoft.asc | tee /etc/apt/trusted.gpg.d/microsoft.asc \
    && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && apt-get install -y mssql-tools18 unixodbc-dev

COPY init.sql /docker-entrypoint-initdb.d/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD /entrypoint.sh