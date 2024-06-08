const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_banned_comments
    CHANGE COLUMN \`id_comment\` \`comment_id\` BIGINT UNSIGNED;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE forum_banned_comments
    CHANGE COLUMN \`comment_id\` \`id_comment\` BIGINT UNSIGNED;
  `);
}

module.exports = { up, down }