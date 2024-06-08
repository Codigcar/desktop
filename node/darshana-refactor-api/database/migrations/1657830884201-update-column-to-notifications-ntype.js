const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`ALTER TABLE notifications DROP COLUMN n_type;`);
  await query(`
    ALTER TABLE notifications  
        ADD COLUMN n_type ENUM(
            'PROJ_APPLICATION_NEW', 
            'JOB_APPLICATION_NEW',
            'PROJ_REQ_END', 
            'PROJ_HIRED_TALENT', 
            'JOB_HIRED_TALENT', 
            'PROJ_UNHIRED_TALENT', 
            'JOB_UNHIRED_TALENT', 
            'JOB_INV_NEW', 
            'PROJ_INV_NEW', 
            'PROJ_START', 
            'PROJ_END' 
        ) DEFAULT NULL
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
}

module.exports = { up, down };
