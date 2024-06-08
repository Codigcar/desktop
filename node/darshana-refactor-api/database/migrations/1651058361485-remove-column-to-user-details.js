const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_details
    DROP COLUMN \`phone_dial_code\`;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_details
    ADD COLUMN \`phone_dial_code\` VARCHAR(255);
  `);
}

module.exports = { up, down };
