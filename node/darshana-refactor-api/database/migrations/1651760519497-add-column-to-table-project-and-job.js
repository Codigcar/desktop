const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table projects
    add column is_visible BIT;
    `);
  await query(`
    alter table jobs
    add column is_visible BIT;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table projects
  drop is_visible;
`);
  await query(`
  alter table jobs
  drop is_visible;
`);
}

module.exports = { up, down };
