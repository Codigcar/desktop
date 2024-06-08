const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    ALTER TABLE business
    DROP COLUMN \`profile_picture_url\`,
    DROP COLUMN \`profile_banner_url\`;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);

  await query(`
  ALTER TABLE business
    ADD COLUMN \`profile_picture_url\` VARCHAR(255),
    ADD COLUMN \`profile_banner_url\` VARCHAR(255);
  `);
}
module.exports = { up, down }