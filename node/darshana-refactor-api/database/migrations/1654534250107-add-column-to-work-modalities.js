const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table work_modalities
    add column name_en VARCHAR(255);
    `);

}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table work_modalities
  drop name_en;
`);
 
}

module.exports = { up, down };
