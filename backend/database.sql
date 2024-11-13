CREATE DATABASE notetube_dev;

CREATE TABLE IF NOT EXISTS app_users(id SERIAL PRIMARY KEY, name TEXT NOT NULL);

-- CREATE EXTENSION TO GENERATE UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE USERS TABLE 
CREATE TABLE IF NOT EXISTS Users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);