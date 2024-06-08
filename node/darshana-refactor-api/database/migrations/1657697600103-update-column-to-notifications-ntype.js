const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`ALTER TABLE notifications DROP COLUMN n_type;`);
  await query(`
    ALTER TABLE notifications  
        ADD COLUMN n_type ENUM(
            'PROJ_REQ_END', 
            'JOB_UNSELECT',
            'PROJ_APPLICATION_NEW', 
            'JOB_APPLICATION_NEW', 
            'PROJ_HIRED_TALENT', 
            'JOB_HIRED_TALENT', 
            'JOB_INV_NEW', 
            'PROJ_INV_NEW', 
            'PROJECT_START', 
            'PROJECT_END'
        ) DEFAULT NULL
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
}

module.exports = { up, down };
