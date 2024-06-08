const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE jobs
      ADD COLUMN \`expected_close_at\` TIMESTAMP NULL DEFAULT NULL;
  `);
}


async function down () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE jobs
    DROP COLUMN \`expected_close_at\`;`);
}

module.exports = { up, down }
