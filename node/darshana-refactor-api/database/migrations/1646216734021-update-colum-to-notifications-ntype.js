const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`ALTER TABLE notifications MODIFY COLUMN n_type ENUM('APP_NEW', 'APP_ACC', 'PROJ_REQ_END', 'PROJ_NEW_INV','JOB_UNSELECT') DEFAULT NULL`);

}

async function down () {
  const {query} = mysqlm.connect(config);
}

module.exports = { up, down }