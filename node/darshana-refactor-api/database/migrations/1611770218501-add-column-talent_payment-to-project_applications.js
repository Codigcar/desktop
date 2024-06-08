const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications
      ADD COLUMN \`talent_payment\` DOUBLE;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_applications
    DROP COLUMN \`talent_payment\`;`);
}

module.exports = { up, down }