const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    UPDATE \`forum_posts\` SET \`status\` = 'active' WHERE \`status\` = '0' OR  \`status\` IS NULL;
  `);
}

module.exports = { up }