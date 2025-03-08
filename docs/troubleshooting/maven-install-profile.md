# Maven install cause error

## Problem

By default, mvn install cause an error -Dspring.profiles.active=local is not set by default

## Solution

Run this custom command to install maven dependencies (don't forget the application-local.yml file):

```bash
mvn install -Dspring.profiles.active=local -f pom.xml
```
