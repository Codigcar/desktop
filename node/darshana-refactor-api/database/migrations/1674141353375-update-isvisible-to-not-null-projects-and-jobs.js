const {config, mysqlm} = require('./.common');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`SET SQL_SAFE_UPDATES = 0;`);
  await query(`update projects set is_visible = true where is_visible is null;`);
  await query(`update jobs set is_visible = true where is_visible is null;`);
  await query(`SET SQL_SAFE_UPDATES = 1;`);
}

async function down () {
  const {query} = mysqlm.connect(config);
}

module.exports = { up, down }