const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
  alter table user_details
  modify verify_email VARCHAR(255) null;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_details
  modify verify_email VARCHAR(255) null;
`);
}

module.exports = { up, down };
