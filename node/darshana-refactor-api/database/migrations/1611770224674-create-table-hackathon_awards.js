const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`hackathon_awards\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      name VARCHAR(255),
      name_es VARCHAR(255),
      summary VARCHAR(255),
      summary_es VARCHAR(255),
      hackathon_id BIGINT UNSIGNED,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`hackathon_awards\``);
}

module.exports = { up, down }