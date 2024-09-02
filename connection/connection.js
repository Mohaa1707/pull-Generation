const sql = require('mssql');

const config = {
    user: 'itracksuser',
    password: 'SECure#06',
    server: 'sqlserver01',
    database: 'itracks',
    trustServerCertificate: true
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
        process.exit(1);
    });

const query = async (queryText, params = []) => { // Default params to an empty array
    const pool = await poolPromise;
    const request = pool.request();

    if (params.length > 0) {
        params.forEach(param => {
            request.input(param.name, param.type, param.value);
        });
    }

    return request.query(queryText);
};

module.exports = {
    sql,
    query
};
