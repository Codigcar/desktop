const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE recovery_codes
      ADD COLUMN \`expires_at\` TIMESTAMP NULL DEFAULT NULL;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE recovery_codes
    DROP COLUMN \`expires_at\`;`);
}

module.exports = { up, down }
