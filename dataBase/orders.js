const { accessToDB } = require('./common');

const createOrderTableQuery = `
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

module.exports = {
    createOrderTable: async function () {
        await accessToDB(createOrderTableQuery, 'Order table created');
    },
}