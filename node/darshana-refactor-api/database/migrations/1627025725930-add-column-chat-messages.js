const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE chat_messages
    ADD COLUMN \`been_read\` BIT DEFAULT 0;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE chat_messages
    ADD COLUMN \`been_read\` BIT DEFAULT 0;
  `);
}

module.exports = { up, down }