const {config, mysqlm} = require('./.common')

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_details add column full_name VARCHAR(255) AFTER user_uuid;
    `);

}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_details drop column full_name;
`);
 
}

module.exports = { up, down }