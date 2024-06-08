const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE notifications
      ADD COLUMN \`action\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE notifications
    DROP COLUMN \`action\`;`);
}

module.exports = { up, down }