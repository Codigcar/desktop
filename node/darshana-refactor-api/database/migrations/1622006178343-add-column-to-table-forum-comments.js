const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_comments
    ADD COLUMN status BIT DEFAULT 0 AFTER featured_count;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`ALTER TABLE forum_comments 
    DROP COLUMN status;`);
}

module.exports = { up, down }