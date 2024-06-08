const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_banned_users
    ADD COLUMN expires TIMESTAMP AFTER status;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`ALTER TABLE forum_banned_users 
    DROP COLUMN expires;`);
}

module.exports = { up, down }