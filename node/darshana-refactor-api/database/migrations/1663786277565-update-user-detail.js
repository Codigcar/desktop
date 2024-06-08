const {config, mysqlm} = require('./.common')

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`ALTER TABLE user_details ADD COLUMN near_wallet VARCHAR(255) NULL;`);

}

async function down () {
  const {query} = mysqlm.connect(config);
}

module.exports = { up, down }