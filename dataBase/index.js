const { createOrderTable } = require('./orders');
const { createPatientTable, addForeignKey } = require('./patients');

async function setup() {
    await createOrderTable();
    await createPatientTable();
    await addForeignKey();
}

setup();