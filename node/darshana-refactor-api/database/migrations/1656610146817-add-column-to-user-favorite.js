const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    alter table user_favorites
    add type varchar(255) not null;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
  alter table user_favorites
  DROP COLUMN type varchar(255);
  `);
}

module.exports = { up, down }