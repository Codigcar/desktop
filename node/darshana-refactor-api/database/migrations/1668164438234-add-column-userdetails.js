const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_details add column discord_url VARCHAR(255), add column profile_percentage double;
    `);

}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_details drop column discord_url, drop column profile_percentage;
`);
 
}

module.exports = { up, down };