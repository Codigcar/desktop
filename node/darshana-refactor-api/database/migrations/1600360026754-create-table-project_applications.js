const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`project_applications\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      user_uuid VARCHAR(255),
      project_id BIGINT UNSIGNED,
      
      proposal TEXT,
      procedure_text TEXT,
      accept_price BIT DEFAULT 0,
      price_proposal DOUBLE,
      accept_time BIT DEFAULT 0,
      time_proposal TIME,
      ready_to_close BIT DEFAULT 0,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`project_applications\``);
}

module.exports = { up, down }