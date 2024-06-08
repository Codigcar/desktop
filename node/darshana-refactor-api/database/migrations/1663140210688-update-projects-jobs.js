const {config, mysqlm} = require('./.common')

async function up() {
  const { query } = mysqlm.connect(config);

  await query(`ALTER DATABASE \`${process.env.DB_DATABASE}\` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`);
  await query(`ALTER TABLE projects CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await query(`ALTER TABLE projects MODIFY description TEXT CHARSET utf8mb4;`);
  await query(`ALTER TABLE projects MODIFY body TEXT CHARSET utf8mb4;`);
  await query(`ALTER TABLE jobs CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await query(`ALTER TABLE jobs MODIFY description TEXT CHARSET utf8mb4;`);
  await query(`ALTER TABLE jobs MODIFY summary TEXT CHARSET utf8mb4;`);
  
}

async function down () {
  const {query} = mysqlm.connect(config);
}

module.exports = { up, down }