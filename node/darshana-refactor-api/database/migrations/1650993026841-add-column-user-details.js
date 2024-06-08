const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
  ADD COLUMN twitter_url VARCHAR(255);
`);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  ALTER TABLE user_details
  DROP COLUMN twitter_url;
`);
}
module.exports = { up, down }