# Database connection in CI

## Problem

Since the Azure Plan is the dev plan, it is not started by default. When you try to connect to the database, you will get an error message.
Relaunching the CI will solve the problem.