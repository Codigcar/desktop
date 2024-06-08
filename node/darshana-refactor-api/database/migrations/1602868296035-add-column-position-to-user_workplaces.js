const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_workplaces
      ADD COLUMN \`position\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_workplaces
    DROP COLUMN \`position\`;`);
}

module.exports = { up, down }