const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table project_application_files
    add file_size varchar(255);
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    ALTER TABLE project_application_files
    DROP COLUMN \`file_size\`;
  `);
}

module.exports = { up, down };
