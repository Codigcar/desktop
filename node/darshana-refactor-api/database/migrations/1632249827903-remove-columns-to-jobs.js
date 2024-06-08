const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE jobs
    DROP COLUMN \`expected_close_at\`,
    DROP COLUMN \`days\`,
    DROP COLUMN \`topic_id\`;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE jobs
    ADD COLUMN \`expected_close_at\` TIMESTAMP NULL DEFAULT NULL,
    ADD COLUMN \`days\` INT,
    ADD COLUMN \`topic_id\` BIGINT UNSIGNED;
  `);
}

module.exports = { up, down }
