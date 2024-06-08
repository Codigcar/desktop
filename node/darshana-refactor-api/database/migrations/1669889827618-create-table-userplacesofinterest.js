const {config, mysqlm} = require('./.common')

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`user_places_of_interest\`(
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      place_of_interest_id BIGINT unsigned not null,
      user_detail_id BIGINT unsigned not null
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`user_places_of_interest\``);
}

module.exports = { up, down }