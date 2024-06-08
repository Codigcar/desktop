const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
      ADD COLUMN \`contact_email\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
    DROP COLUMN \`contact_email\`;`);
}

module.exports = { up, down }
