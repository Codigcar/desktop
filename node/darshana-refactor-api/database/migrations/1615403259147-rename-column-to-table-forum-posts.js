const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_posts
    CHANGE COLUMN \`user_uuid\` \`author_id\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE forum_posts
  CHANGE COLUMN \`author_id\` \`user_uuid\` VARCHAR(255);`);
}

module.exports = { up, down }