const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_workplaces
    add column workplace_name varchar(255) not null,
    add column enable_business varchar(255) not null;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_workplaces
  drop workplace_name,
  drop enable_business;
`);
}

module.exports = { up, down };
