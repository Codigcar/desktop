const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table user_workplaces
    add workplace_id bigint null;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    ALTER TABLE user_workplaces
    DROP COLUMN \`workplace_id\`;
  `);
}

module.exports = { up, down }