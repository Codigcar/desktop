const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`jobs\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      recruiter_id BIGINT UNSIGNED,
      business_id BIGINT UNSIGNED,
      job_status_id BIGINT UNSIGNED,
      topic_id BIGINT UNSIGNED,
      
      name VARCHAR(255),
      description TEXT,
      status BIT DEFAULT 0,
      contract_type VARCHAR(255),
      summary TEXT,
      functions TEXT,
      requirements TEXT,
      salary DOUBLE,
      image_url VARCHAR(255),
      end_date DATE,
      days INT,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`jobs\``);
}

module.exports = { up, down }
