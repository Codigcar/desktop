const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE projects
      ADD COLUMN \`end_date\` DATE;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE projects
    DROP COLUMN \`end_date\`;`);
}

module.exports = { up, down }