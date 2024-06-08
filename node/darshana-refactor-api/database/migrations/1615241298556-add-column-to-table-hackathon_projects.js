const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE hackathons
      ADD COLUMN \`evaluation_description_es\` TEXT;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE hackathons
    DROP COLUMN \`evaluation_description_es\`;`);
}

module.exports = { up, down }