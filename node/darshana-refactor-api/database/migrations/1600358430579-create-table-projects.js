const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`projects\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      recruiter_id BIGINT UNSIGNED,
      business_id BIGINT UNSIGNED,
      project_status_id BIGINT UNSIGNED,
      topic_id BIGINT UNSIGNED,
      
      name VARCHAR(255),
      description TEXT,
      status BIT DEFAULT 0,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`projects\``);
}

module.exports = { up, down }