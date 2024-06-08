const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE hackaton_categories RENAME hackathon_categories
    `);
  }
  
async function down () {
    const {query} = mysqlm.connect(config);
    
  await query(`
    ALTER TABLE hackathon_categories RENAME hackaton_categories
  `);
}

module.exports = { up, down }