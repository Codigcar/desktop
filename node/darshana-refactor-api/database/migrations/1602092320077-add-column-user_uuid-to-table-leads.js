const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE leads
      ADD COLUMN \`user_uuid\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE leads
    DROP COLUMN user_uuid;`);
}

module.exports = { up, down }