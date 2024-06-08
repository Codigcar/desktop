const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_details
    add column status VARCHAR(255) default "active" not null;
    `);

}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table user_details
  drop status;
`);
 
}

module.exports = { up, down };
