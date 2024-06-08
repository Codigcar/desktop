const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_study_centres
      ADD COLUMN \`start_date\` DATE;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_study_centres
    DROP COLUMN \`start_date\`;`);
}

module.exports = { up, down }