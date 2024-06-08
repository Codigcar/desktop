const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_habilities
    RENAME \`user_skills\`;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_skills
  RENAME \`user_habilities\`;
  `);
}

module.exports = { up, down }