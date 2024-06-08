const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE \`forum_posts\` CHANGE COLUMN \`status\` \`status\` VARCHAR(255) NOT NULL DEFAULT 'active';
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE \`forum_posts\` CHANGE COLUMN \`status\` \`status\` VARCHAR(255) BIT DEFAULT 0;
  `);
}

module.exports = { up, down }