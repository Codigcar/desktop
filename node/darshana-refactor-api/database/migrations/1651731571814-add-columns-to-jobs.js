const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table jobs
    add column contract_time varchar(255) not null;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table jobs
  drop contract_time ;
`);
}

module.exports = { up, down };
