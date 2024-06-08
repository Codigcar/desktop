const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
      ADD COLUMN \`google_id_token\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
    DROP COLUMN \`google_id_token\`;`);
}

module.exports = { up, down }