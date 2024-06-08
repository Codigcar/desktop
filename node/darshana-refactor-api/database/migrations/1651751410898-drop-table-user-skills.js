const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`user_skills\``);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
  CREATE TABLE \`user_skills\`(
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    name VARCHAR(255),
    lastname VARCHAR(255),
    lastname_2 VARCHAR(255),
    document_type VARCHAR(255),
    document_number VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    password TEXT,
    example_id BIGINT UNSIGNED,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
  )
`);
}

module.exports = { up, down }