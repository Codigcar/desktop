const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE hackathons
      ADD COLUMN \`is_archived\` BIT DEFAULT 1;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE hackathons
    DROP COLUMN \`is_archived\`;`);
}

module.exports = { up, down }