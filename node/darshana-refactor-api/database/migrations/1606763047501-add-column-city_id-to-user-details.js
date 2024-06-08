const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
      ADD COLUMN \`city_id\` BIGINT UNSIGNED;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
    DROP COLUMN \`city_id\`;`);
}

module.exports = { up, down }
