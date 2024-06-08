const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    alter table project_skills
    drop column name;
  `);
  await query(`
    alter table project_skills
    add skill_id bigint unsigned not null;
  `);

  await query(`
  SET FOREIGN_KEY_CHECKS=0;
  `);

  await query(`
  alter table project_skills
  add constraint project_skills_skills_id_fk
      foreign key (skill_id) references skills (id)
          on delete cascade;
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`
  alter table project_skills
  change name name bigint unsigned not null;
`);
}

module.exports = { up, down }