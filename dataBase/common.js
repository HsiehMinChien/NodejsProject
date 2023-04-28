const { Pool } = require('pg');
const { dbConfig } = require('../constants/db');

var pool = new Pool(dbConfig);

async function accessToDB(query, event) {
  const client = await pool.connect();
  try {
    await client.query(query);
    console.log(event);
  } catch (err) {
    console.error(`Error ${event}`, err);
  } finally {
    client.release();
  }
}

module.exports = {
  accessToDB
};