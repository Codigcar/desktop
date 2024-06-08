const {config, mysqlm} = require('./.common');

async function up() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table projects add column mobile_image_url varchar(255);
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
    alter table projects drop column mobile_image_url;
  `);
}

module.exports = { up, down }