const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table project_applications add column salary_counter_proposal double, add time_counter_proposal int, add counter_proposal_status int;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table project_applications drop column salary_counter_proposal, drop column time_counter_proposal, drop column counter_proposal_status;
  `);
}

module.exports = { up, down }