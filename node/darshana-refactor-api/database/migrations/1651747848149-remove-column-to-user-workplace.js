const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_workplaces
    drop name;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_workplaces
  add column name varchar(255) not null,
`);
}

module.exports = { up, down };
