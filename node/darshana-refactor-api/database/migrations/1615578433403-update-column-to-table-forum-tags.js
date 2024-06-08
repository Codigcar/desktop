const {config, mysqlm} = require('./.common');

async function up () {
    const {query} = mysqlm.connect(config);

    await query(`
    ALTER TABLE forum_tags
    MODIFY \`slug\` VARCHAR(255) NOT NULL,
    MODIFY \`name\` VARCHAR(255) NOT NULL;
  `);
}

async function down () {
    const {query} = mysqlm.connect(config);

    await query(`
    ALTER TABLE forum_tags
    MODIFY \`slug\` VARCHAR(255) NULL,
    MODIFY \`name\` VARCHAR(255) NULL;
  `);
}

module.exports = { up, down }
