#!/bin/bash
/opt/mssql/bin/sqlservr & 
sleep 15
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i /docker-entrypoint-initdb.d/init.sql -C
wait