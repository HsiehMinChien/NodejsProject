const { Pool } = require('pg');
const { dbConfig } = require('../constants/db');

// 資料庫連線設定
const pool = new Pool(dbConfig)

// 創建 table 的 SQL 語句
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`

// 連線資料庫，並創建 table
pool.query(createTableQuery)
    .then(() => console.log('Table created successfully!'))
    .catch(err => console.error('Error creating table:', err))
    .finally(() => pool.end())