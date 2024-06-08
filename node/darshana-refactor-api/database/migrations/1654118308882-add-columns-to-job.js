const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table jobs
    add work_modality_id int not null,
    add country_id int not null;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    ALTER TABLE jobs
    DROP COLUMN \`work_modality_id\`,
    DROP COLUMN \`country_id\`;
  `);
}

module.exports = { up, down };
