const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`business\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      user_workplace_id BIGINT UNSIGNED,
      user_uuid VARCHAR(255),
      profile_picture_url VARCHAR(255),
      profile_banner_url VARCHAR(255),
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config); 
  await query(`DROP TABLE \`business\``);
}

module.exports = { up, down }