const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications 
    ADD COLUMN shown_accepted_message BIT DEFAULT 0;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE project_applications DROP COLUMN shown_accepted_message;
  `);
}

module.exports = { up, down }
