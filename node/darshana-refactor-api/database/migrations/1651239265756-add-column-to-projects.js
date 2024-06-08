const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table projects
    add weeks int not null;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    ALTER TABLE projects
    DROP COLUMN \`weeks\`;
  `);
}

module.exports = { up, down };
