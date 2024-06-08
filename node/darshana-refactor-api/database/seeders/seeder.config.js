const {mysqlm, config} = require('../migrations/.common');
const conn = mysqlm.connect(config);

module.exports = {
    tables: () => [
        // { table: 'countries', data: require('./countries') },
        { table: 'cities', data: require('./cities') },
        // { table: 'project_statuses', data: require('./project_statuses') },
        // { table: 'job_statuses', data: require('./job_statuses') },
        // { table: 'work_modalities', data: require('./work_modalities') },
        // { table: 'topics', data: require('./topics') },
    ],
    process: ({table, data}) => {
        if(typeof data === 'string') {
            return conn.query(data);
        } else {
            return conn.query(`INSERT INTO \`${table}\` SET ?`, data);
        }
    }
}
