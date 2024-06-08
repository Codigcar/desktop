const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_tags
    CHANGE COLUMN \`title\` \`name\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_tags
    CHANGE COLUMN \`name\` \`title\` VARCHAR(255);
  `);
}

module.exports = { up, down }