const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE projects
      ADD COLUMN \`image_url\` VARCHAR(255);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE projects
    DROP COLUMN \`image_url\`;`);
}

module.exports = { up, down }
