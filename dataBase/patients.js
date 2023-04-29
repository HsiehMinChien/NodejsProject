const { accessToDB } = require('./common');

const createPatientTableQuery = `
  CREATE TABLE IF NOT EXISTS patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    orderId INTEGER REFERENCES orders(id)
  );
`;

const addForeignKeyQuery = `
  ALTER TABLE patient
  ADD CONSTRAINT orders_patient_id_fkey
  FOREIGN KEY (orderId)
  REFERENCES orders(id)
`;

module.exports = {
  createPatientTable: async function () {
    await accessToDB(createPatientTableQuery, 'Patient table created');
  },
  addForeignKey: async function () {
    await accessToDB(addForeignKeyQuery, 'Foreign key added');
  }
};
