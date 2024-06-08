const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
      ADD COLUMN \`is_talent\` BIT DEFAULT 0;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
    DROP COLUMN \`is_talent\`;`);
}

module.exports = { up, down }