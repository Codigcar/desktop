const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    ALTER TABLE user_study_centres
      ADD COLUMN \`studying_here\` BIT DEFAULT 0;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);

  await query(`
  ALTER TABLE user_study_centres
    DROP COLUMN \`studying_here\`;
    `);
}

module.exports = { up, down };
