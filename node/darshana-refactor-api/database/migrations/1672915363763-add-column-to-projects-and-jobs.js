const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table jobs add column category varchar(255);
  `);
  await query(`
    alter table projects add column category varchar(255);
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table jobs drop column category;
  `);
  await query(`
    alter table projects drop column category;
  `);
}

module.exports = { up, down }