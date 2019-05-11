# blimp API

node Version: v10.15.3
npm Verison: v6.4.1

Blimp API/Backend

## Getting Started and Tests

### Setting up Local Postgres Instance

```
brew install postgresql
brew
psql postgres
```

Once connected to Postgres instance:

1. Create a user:

```
postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
postgres=# ALTER ROLE me CREATEDB;
\q
```

2. Reconnect to the DB
```
psql -d postgres -U me
```

3. Create DB and insert some fake data:

```
\i refresh_data.sql
CREATE DATABASE blimp;
\c blimp
\i setup_data.sql
```

4. Confirm creation of data:

```
SELECT * FROM dashboard;
```

### Set up and Running

1. Set up Postgres Instance

2. Install all dependencies

```
npm install
```

To Run:

First start up postgres instance

```
brew services start postgresql
```

```
npm start
```

Running tests:

```
npm run test
```

Test Coverage Report:

```
npm run cov
```
