const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE projects
      ADD COLUMN \`body\` TEXT;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE projects
    DROP COLUMN \`body\`;`);
}

module.exports = { up, down }