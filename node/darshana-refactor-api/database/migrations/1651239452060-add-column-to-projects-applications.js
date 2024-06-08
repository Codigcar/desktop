const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table project_applications
    add weeks int not null;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    ALTER TABLE project_applications
    DROP COLUMN \`weeks\`;
  `);
}

module.exports = { up, down };
