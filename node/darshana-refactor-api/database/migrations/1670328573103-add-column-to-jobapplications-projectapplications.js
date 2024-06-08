const {config, mysqlm} = require('./.common')

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table job_applications add column updated bit;
  `);

  await query(`
    alter table project_applications add column updated bit;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table job_applications drop column updated;
  `);
  await query(`
    alter table project_applications drop column updated;
  `);
}

module.exports = { up, down }