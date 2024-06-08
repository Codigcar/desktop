const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`job_applications\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      user_uuid VARCHAR(255),
      job_id BIGINT UNSIGNED,
      
      summary TEXT,
      experience TEXT,
      file_url TEXT NULL DEFAULT NULL,
      file_name varchar(255) NULL DEFAULT NULL,
      file_size varchar(255) NULL DEFAULT NULL,
      time_proposal INT(11) DEFAULT NULL,
      ready_to_close BIT DEFAULT 0,
      selected BIT DEFAULT 0,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`job_applications\``);
}

module.exports = { up, down }
