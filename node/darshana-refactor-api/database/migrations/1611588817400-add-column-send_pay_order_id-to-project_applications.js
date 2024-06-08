const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications
      ADD COLUMN \`send_pay_order_id\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_applications
    DROP COLUMN \`send_pay_order_id\`;`);
}

module.exports = { up, down }