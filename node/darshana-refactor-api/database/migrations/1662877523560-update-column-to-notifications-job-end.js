const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table notifications
  modify n_type enum (
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
    'PROJ_END', 
    'NEW_MESSAGE', 
    'PROJECT_START', 
    'PROJECT_END', 
    'PROJ_FROM_POSTULATION_TO_SELECT_TALENT',
    'JOB_FROM_POSTULATION_TO_SELECT_TALENT',
    'JOB_END'
    ) null;
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
}

module.exports = { up, down };
