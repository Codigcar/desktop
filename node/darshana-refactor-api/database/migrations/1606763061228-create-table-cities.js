const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`cities\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      
      country_iso2 VARCHAR(255),
      name VARCHAR(255),
      lat DOUBLE,
      lng DOUBLE,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`cities\``);
}

module.exports = { up, down }