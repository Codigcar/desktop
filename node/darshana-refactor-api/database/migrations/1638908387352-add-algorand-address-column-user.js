const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
  ADD COLUMN algo_address VARCHAR(200);
`);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  ALTER TABLE user_details
  DROP COLUMN algo_address;
`);
}

module.exports = { up, down };
