#!/bin/bash

/opt/mssql-tools18/bin/sqlcmd -S sqlserver -U sa -P YourStrong!Passw0rd -C -i /docker-entrypoint-initdb.d/init.sql

echo "Database lootopia initialized 🥳"