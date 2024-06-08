const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_habilities
    RENAME \`project_skills\`;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_skills
  RENAME \`project_habilities\`;
  `);
}

module.exports = { up, down }