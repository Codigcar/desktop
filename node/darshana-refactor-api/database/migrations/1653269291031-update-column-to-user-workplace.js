const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
  alter table user_workplaces
  drop enable_business;
    `);

  await query(`
  alter table user_workplaces
  add enable_business bit default 0;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_workplaces
    modify enable_business VARCHAR(255)
`);
}

module.exports = { up, down };
