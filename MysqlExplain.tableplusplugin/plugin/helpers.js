'use strict';

function executeQuery(context, sql, fn) {
    context.execute(sql, (res) => {
        if (res.message.length > 0) {
            fn(new Error(res.message));

            return;
        }

        const columns = Object.getOwnPropertyNames(res.columns);
        const rows = res.rows.map((row) => Object.fromEntries(columns.map((column) => [column, row.raw(column)])));

        fn(rows);
    });
}

export {
    executeQuery,
};
