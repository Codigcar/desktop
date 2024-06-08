const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
  ALTER TABLE project_applications
  DROP COLUMN \`time_proposal\`;`);
}

async function down () {
  const {query} = mysqlm.connect(config);
  
  await query(`
    ALTER TABLE project_applications
      ADD COLUMN \`time_proposal\` TIME;
  `);
}

module.exports = { up, down }