const { Pool } = require('pg');
const { dbConfig } = require('../constants/db');

const pool = new Pool(dbConfig);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('Table created successfully!'))
  .catch(err => console.error('Error creating table:', err))
  .finally(() => pool.end());