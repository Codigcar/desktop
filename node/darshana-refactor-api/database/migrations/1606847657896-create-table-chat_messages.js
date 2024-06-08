const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`chat_messages\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      chat_id BIGINT UNSIGNED,
      from_user_uuid VARCHAR(255),
      to_user_uuid VARCHAR(255),
      image_url VARCHAR(255),
      message TEXT,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`chat_messages\``);
}

module.exports = { up, down }