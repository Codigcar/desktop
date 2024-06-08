const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_application_files
      ADD COLUMN \`file_name\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_application_files
    DROP COLUMN \`file_name\`;`);
}

module.exports = { up, down }
