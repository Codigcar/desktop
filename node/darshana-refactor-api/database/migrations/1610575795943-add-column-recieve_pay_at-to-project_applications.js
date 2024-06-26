const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications
      ADD COLUMN \`recieve_pay_at\` TIMESTAMP NULL DEFAULT NULL;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_applications
    DROP COLUMN \`recieve_pay_at\`;`);
}

module.exports = { up, down }