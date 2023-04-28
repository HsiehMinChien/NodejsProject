const { Pool } = require('pg');
const { dbConfig } = require('../constants/db');

const pool = new Pool(dbConfig);

module.exports = {
  query: (text, params) => pool.query(text, params)
};