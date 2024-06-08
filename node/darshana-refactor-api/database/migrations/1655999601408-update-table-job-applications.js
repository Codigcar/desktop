const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    alter table job_applications
    modify selected int default b'0' null;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
  alter table job_applications
  modify selected bit default 0 null`);
}

module.exports = { up, down }