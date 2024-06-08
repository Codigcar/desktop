const {config, mysqlm} = require('./.common')

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table jobs add column min_salary double, add column max_salary double;
  `);
  await query(`
    alter table projects add column min_salary double, add column max_salary double;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table jobs drop column min_salary;
  `);
  await query(`
    alter table jobs drop column max_salary;
  `);
  await query(`
    alter table projects drop column min_salary;
  `);
  await query(`
    alter table projects drop column max_salary;
  `);
}

module.exports = { up, down }