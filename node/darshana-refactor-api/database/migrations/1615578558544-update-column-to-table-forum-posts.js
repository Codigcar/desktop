const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_posts
      MODIFY \`user_uuid\` VARCHAR(255) NOT NULL,
      MODIFY \`title\` VARCHAR(255) NOT NULL,
      MODIFY \`content\` TEXT NOT NULL;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_posts
      MODIFY \`user_uuid\` VARCHAR(255) NULL,
      MODIFY \`title\` VARCHAR(255) NULL,
      MODIFY \`content\` TEXT NULL;
  `);
}

module.exports = { up, down }