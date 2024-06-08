const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table jobs add column hourly_wage double;
  `);
  await query(`
    alter table projects add column hourly_wage double;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table jobs drop column hourly_wage;
  `);
  await query(`
    alter table projects drop column hourly_wage;
  `);
}

module.exports = { up, down }