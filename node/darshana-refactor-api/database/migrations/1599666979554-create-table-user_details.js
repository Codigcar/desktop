const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`user_details\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      user_uuid VARCHAR(255) NOT NULL UNIQUE,
      purpose VARCHAR(255),
      country_id BIGINT UNSIGNED,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`user_details\``);
}

module.exports = { up, down }