const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
    MODIFY COLUMN \`google_id_token\` TEXT;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
  MODIFY COLUMN \`google_id_token\` VARCHAR(255);`);
}

module.exports = { up, down }