const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`news\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      title VARCHAR(255),
      description VARCHAR(255),
      body TEXT,
      white_image BIT DEFAULT 0,
      image_url VARCHAR(255),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`news\``);
}

module.exports = { up, down }