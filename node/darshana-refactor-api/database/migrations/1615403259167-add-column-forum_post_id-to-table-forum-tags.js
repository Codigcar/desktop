const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_tags
      ADD COLUMN \`forum_post_id\` BIGINT UNSIGNED;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE forum_tags
    DROP COLUMN \`forum_post_id\`;`);
}

module.exports = { up, down }