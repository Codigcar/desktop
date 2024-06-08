const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_posts
    ADD COLUMN \`featured_count\` INT(11) NOT NULL DEFAULT 0 AFTER \`content\`;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE forum_posts
    DROP COLUMN \`featured_count\`;
  `);
}

module.exports = { up, down }