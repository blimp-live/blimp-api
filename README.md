# blimp API

node Version: v10.15.3
npm Version: v6.4.1

Blimp API/Backend

## Getting Started and Tests

### Setting up Local Postgres Instance

##### MacOS

```
brew install postgresql
brew
psql postgres
```

##### Windows

```
Follow Steps 1 and 2 of https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm
For step 1, download PostgreSQL 11+
It's useful to download PgAdmin as well, which is prompted during the setup process.
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

### How to Deploy

```
heroku login
# Only run one below if first time deploying
heroku git:remote -a http://blimp-live
git push heroku master
heroku open
```
