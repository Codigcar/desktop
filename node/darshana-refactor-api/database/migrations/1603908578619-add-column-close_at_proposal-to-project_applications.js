const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE project_applications
      ADD COLUMN \`close_at_proposal\` TIMESTAMP NULL DEFAULT NULL;
  `);
  await query(`
    UPDATE project_applications SET close_at_proposal = TIMESTAMP(ADDTIME(created_at, time_proposal));
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`
    UPDATE project_applications SET time_proposal = TIMEDIFF(close_at_proposal, created_at);
  `);
  await query(`ALTER TABLE project_applications
    DROP COLUMN \`close_at_proposal\`;`); 
}

module.exports = { up, down }