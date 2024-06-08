const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
  create table workplaces
  (
      id                bigint unsigned auto_increment,
      name                varchar(255) not null,
      profile_picture_url varchar(255) null,
      profile_banner_url  varchar(255) null,
      constraint workplaces_pk
          primary key (id),
      

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL
  );
  `);

  await query(`
  create unique index workplaces_id_uindex
  on workplaces (id);
  `);

 

  
}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`DROP TABLE \`workplaces\``);
}

module.exports = { up, down };
