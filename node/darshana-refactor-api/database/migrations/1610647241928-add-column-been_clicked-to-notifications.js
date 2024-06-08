const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE notifications
      ADD COLUMN \`been_clicked\` BIT DEFAULT 0;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE notifications
    DROP COLUMN \`been_clicked\`;`);
}

module.exports = { up, down }