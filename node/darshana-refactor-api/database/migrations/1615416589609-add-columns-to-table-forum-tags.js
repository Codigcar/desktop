const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE forum_tags
    ADD COLUMN \`slug\` VARCHAR(255) NULL AFTER \`name\`;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE forum_tags
    DROP COLUMN \`slug\`;
  `);
}

module.exports = { up, down }