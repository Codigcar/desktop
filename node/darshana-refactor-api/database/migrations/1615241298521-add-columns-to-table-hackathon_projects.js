const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE hackathon_projects
    ADD COLUMN category VARCHAR(255),
    ADD COLUMN category_es VARCHAR(255),
    ADD COLUMN hackathon_id BIGINT UNSIGNED,
    ADD COLUMN is_active BIT DEFAULT 1,
    DROP COLUMN hackathon_category_id;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE hackathon_projects
    DROP COLUMN category,
    DROP COLUMN category_es,
    DROP COLUMN hackathon_id,
    DROP COLUMN is_active,
    ADD COLUMN hackathon_category_id BIGINT UNSIGNED;`);
}

module.exports = { up, down }