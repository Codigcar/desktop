const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE hackathons
      ADD COLUMN \`is_active\` BIT DEFAULT 0;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE hackathons
    DROP COLUMN \`is_active\`;`);
}

module.exports = { up, down }