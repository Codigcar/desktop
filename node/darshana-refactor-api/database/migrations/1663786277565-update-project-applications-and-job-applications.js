const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`ALTER TABLE job_applications ADD COLUMN algorand_transaction VARCHAR(255) NULL, ADD COLUMN near_transaction VARCHAR(255) NULL;`);
  await query(`ALTER TABLE project_applications ADD COLUMN algorand_transaction VARCHAR(255) NULL, ADD COLUMN near_transaction VARCHAR(255) NULL`);

}

async function down () {
  const {query} = mysqlm.connect(config);
}

module.exports = { up, down }