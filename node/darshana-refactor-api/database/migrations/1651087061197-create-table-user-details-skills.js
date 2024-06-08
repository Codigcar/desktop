const { config, mysqlm } = require("./.common.js");

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`
    create table user_details_skills
    (
        id                bigint unsigned auto_increment,
        user_detail_id    bigint unsigned not null,
        skill_id          bigint unsigned not null,
        constraint        user_details_skills_pk
            primary key (id),
        constraint user_details_skills_skills_id_fk
            foreign key (skill_id) references skills (id)
                on delete cascade,
        constraint user_details_skills_user_details_id_fk
            foreign key (user_detail_id) references user_details (id)
                on delete cascade,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL
    );
  `);

  await query(`
  create unique index user_details_skills_id_uindex
    on user_details_skills (id);
`);

}

async function down() {
  const { query } = mysqlm.connect(config);
  await query(`DROP TABLE \`user_details_skills\``);
}

module.exports = { up, down };
