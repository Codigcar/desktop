const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table projects
    add user_uuid VARCHAR(255);
    `);
  await query(`
    alter table jobs
    add user_uuid VARCHAR(255);
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table projects
  drop user_uuid;
`);
  await query(`
  alter table jobs
  drop user_uuid;
`);
}

module.exports = { up, down };
