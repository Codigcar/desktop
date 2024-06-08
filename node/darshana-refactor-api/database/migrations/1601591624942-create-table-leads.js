const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`leads\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      title VARCHAR(255),
      query_type VARCHAR(255),
      description VARCHAR(255),
      email VARCHAR(255),
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`leads\``);
}

module.exports = { up, down }