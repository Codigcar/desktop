const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE projects
      ADD COLUMN \`expected_close_at\` TIMESTAMP NULL DEFAULT NULL;
  `);
  await query(`
    UPDATE projects SET expected_close_at = TIMESTAMP(ADDTIME(created_at, max_time));
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE projects
    DROP COLUMN \`expected_close_at\`;`); 
}

module.exports = { up, down }
