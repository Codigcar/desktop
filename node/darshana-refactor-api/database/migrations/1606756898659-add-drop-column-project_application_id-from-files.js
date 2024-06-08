const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_application_files
  DROP COLUMN \`project_application_id\`;`);
}

async function down () {
  const {query} = mysqlm.connect(config);
  
  await query(`
    ALTER TABLE project_application_files
      ADD COLUMN \`project_application_id\` BIGINT UNSIGNED;
  `);
}

module.exports = { up, down }