const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications 
    ADD COLUMN days INT(11) DEFAULT NULL AFTER accept_time;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE project_applications DROP COLUMN days;
  `);
}

module.exports = { up, down }
