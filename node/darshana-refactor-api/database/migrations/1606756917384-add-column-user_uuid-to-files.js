const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_application_files
      ADD COLUMN \`user_uuid\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_application_files
    DROP COLUMN \`user_uuid\`;`);
}

module.exports = { up, down }
