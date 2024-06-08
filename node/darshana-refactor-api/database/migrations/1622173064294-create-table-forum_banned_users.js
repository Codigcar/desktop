const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`forum_banned_users\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_uuid VARCHAR(255),
      reason VARCHAR(255),
      description TEXT,
      status VARCHAR(255) NOT NULL DEFAULT 'active',
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`forum_banned_users\``);
}

module.exports = { up, down }