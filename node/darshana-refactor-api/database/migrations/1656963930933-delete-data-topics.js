const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
  TRUNCATE TABLE \`topics\`
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
  TRUNCATE TABLE \`topics\`
  `);
}

module.exports = { up, down }