const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications
      ADD COLUMN \`accepted\` BIT DEFAULT 0;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_applications
    DROP COLUMN \`accepted\`;`);
}

module.exports = { up, down }