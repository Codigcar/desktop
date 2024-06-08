const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_posts
    ADD COLUMN featured BIT DEFAULT 0 AFTER status;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`ALTER TABLE forum_posts
    DROP COLUMN featured;`);
}

module.exports = { up, down }