const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE projects
      ADD COLUMN \`max_time\` TIME;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE projects
    DROP COLUMN \`max_time\`;`);
}

module.exports = { up, down }