const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
  create table skills
  (
      id   bigint unsigned auto_increment,
      name varchar(255) not null,
      constraint skills_pk
          primary key (id),


      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
  );
  `);
  await query(`
  create unique index skills_id_uindex
  on skills (id);
  `);
  await query(`
  create unique index skills_name_uindex
  on skills (name);
  `);
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`DROP TABLE \`skills\``);
}

module.exports = { up, down };
