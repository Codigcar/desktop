const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE hackatons RENAME hackathons
    `);
  }
  
async function down () {
    const {query} = mysqlm.connect(config);
    
  await query(`
    ALTER TABLE hackathons RENAME hackatons
  `);
}

module.exports = { up, down }