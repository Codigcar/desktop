const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_posts
    ADD COLUMN \`slug\` VARCHAR(255) NOT NULL AFTER \`title\`;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE forum_posts
    DROP COLUMN \`slug\`;
  `);
}

module.exports = { up, down }