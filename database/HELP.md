# Commandes à lancer pour setup sa base de données de en local

## Lancer le container

```sh
docker compose up -d
```

## Une fois connecté au container (avec docker exec ou en depuis l'interface graphique de Docker Desktop), pour se connecter à la base de données

```sh
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -C
```

## Vérifier que la base de données est bien créée (la bdd lootopia doit apparaître)

```sql
SELECT name FROM sys.databases;
```