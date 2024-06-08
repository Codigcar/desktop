const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    alter table project_applications
    modify accepted int default b'0' null;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
  alter table project_applications
  modify accepted bit default 0 null`);
}

module.exports = { up, down }