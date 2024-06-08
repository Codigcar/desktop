const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    ALTER TABLE notifications  
        ADD COLUMN n_type ENUM('APP_NEW', 'APP_ACC', 'PROJ_REQ_END', 'PROJ_NEW_INV') DEFAULT NULL,
        ADD COLUMN project_name VARCHAR(200),
        ADD COLUMN person_name VARCHAR(200);
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
    ALTER TABLE notifications 
        DROP COLUMN n_type,
        DROP COLUMN project_name,
        DROP COLUMN person_name;
  `);
}

module.exports = { up, down }
