
CREATE TYPE ROLE_T as ENUM('view', 'edit', 'owner');
CREATE TABLE dashboard (
  id SERIAL NOT NULL PRIMARY KEY,
  url VARCHAR(255),
  name VARCHAR(255),
  contents JSON,
  public BOOLEAN,
  last_saved TIMESTAMP,
  created_at TIMESTAMP NOT NULL
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  img_url TEXT,
  name TEXT NOT NULL,
  password TEXT NOT NULL
);
CREATE TABLE permissions (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dashboard_id INTEGER REFERENCES dashboard(id) ON DELETE CASCADE,
  role role_t
);

INSERT INTO users (email, img_url, name, password)
  VALUES('fakeuser@gmail.com', 'iamurlwow/me', 'John Smith', 'test'),
        ('alsofakeuser@gmail.com', 'iamurlwow/me', 'Test User', 'test');

INSERT INTO dashboard(url, name, contents, public, last_saved, created_at)
  VALUES('/mydashboard', 'My Dashboard', '{}', true, current_timestamp, current_timestamp),
        ('/testdashboard', 'Test Dashboard', '{}', true, current_timestamp, current_timestamp);

INSERT INTO permissions(user_id, dashboard_id, role)
  VALUES(1, 1, 'owner'),
        (2, 2, 'owner');
