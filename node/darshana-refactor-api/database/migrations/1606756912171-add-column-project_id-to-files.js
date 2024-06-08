const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_application_files
      ADD COLUMN \`project_id\` BIGINT UNSIGNED;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_application_files
    DROP COLUMN \`project_id\`;`);
}

module.exports = { up, down }
