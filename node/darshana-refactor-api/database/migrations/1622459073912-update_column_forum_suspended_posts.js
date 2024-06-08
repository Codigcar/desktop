const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_suspended_posts
    CHANGE COLUMN \`id_post\` \`post_id\` BIGINT UNSIGNED;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE forum_suspended_posts
    CHANGE COLUMN \`post_id\` \`id_post\` BIGINT UNSIGNED;
  `);
}

module.exports = { up, down }