const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE projects
    ADD COLUMN days INT AFTER image_url;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`ALTER TABLE projects 
    DROP COLUMN days;`);
}

module.exports = { up, down }
