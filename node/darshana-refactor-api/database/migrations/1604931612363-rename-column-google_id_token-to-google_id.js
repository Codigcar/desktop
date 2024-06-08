const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
    CHANGE COLUMN \`google_id_token\` \`google_id\` TEXT;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
  CHANGE COLUMN \`google_id\` \`google_id_token\` TEXT;`);
}

module.exports = { up, down }