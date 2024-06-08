const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_details
    add column verify_email BIT;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_details
  drop verify_email;
`);
}

module.exports = { up, down };
