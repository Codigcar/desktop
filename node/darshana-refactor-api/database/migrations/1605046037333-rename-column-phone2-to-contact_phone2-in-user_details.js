const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
    CHANGE COLUMN \`phone2\` \`contact_phone2\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
  CHANGE COLUMN \`contact_phone2\` \`phone2\` VARCHAR(255);`);
}

module.exports = { up, down }