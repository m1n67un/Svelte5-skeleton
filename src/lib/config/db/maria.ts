import { createPool } from 'mysql2/promise';

let pool: any = null;

function DB_CONNEECT() {
    if (!pool) {
        pool = createPool({
            host: import.meta.env.VITE_DB_CONNECT_HOST,
            port: Number(import.meta.env.VITE_DB_CONNECT_PORT),
            user: import.meta.env.VITE_DB_CONNECT_USER,
            password: import.meta.env.VITE_DB_CONNECT_PASSWORD,
            database: import.meta.env.VITE_DB_CONNECT_DATABASE,
            enableKeepAlive: true
        });
    }
    return pool;
}

function SQL_QUERY(sql: any) {
    let result = sql;
    let match = sql.match(/:(?<=\:)(.*?)(?=\:):/g);

    let str = ':undefined:';
    if(match != null) {
        if(match.length != 0) {
            for(var i in match) {
                str = match[i];
                result = result.split(`?${str}`).join('?')
            }
        }
    }
    result = result.split(`?${str}`).join('?')
    return result;
}

export async function q(query: string, params: any[]) {
    let pool = await DB_CONNEECT();
    let sql = SQL_QUERY(query);
    console.log(sql);
    console.log(params);
    let results = await pool.query(sql, params)
    .then(([rows, fields]: [any, any]) => {
        return rows;
    })
    return results;
}