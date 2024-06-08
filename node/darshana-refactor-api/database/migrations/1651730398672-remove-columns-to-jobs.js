const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    alter table jobs
    drop column functions,
    drop column requirements,
    drop column image_url;
    `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`
  alter table jobs
  add functions varchar(255) not null,
  add image_url varchar(255) not null,
  add requirements varchar(255) not null;
`);
}

module.exports = { up, down };
