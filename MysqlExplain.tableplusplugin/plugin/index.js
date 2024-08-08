'use strict';

import { executeQuery } from './helpers';

function handleResults(context, sql, resExplainJson, resExplainTree, resVersion) {
    for (const res of [resExplainJson, resVersion]) {
        if (res instanceof Error) {
            context.alert('Error', res.message);

            return;
        }
    }

    const data = {
        query: sql,
        version: resVersion[0]?.version,
        explain_json: resExplainJson[0]?.EXPLAIN,
        explain_tree: resExplainTree[0]?.EXPLAIN ?? null,
    };

    context
        .loadFile(`${Application.pluginRootPath()}/com.mysqlexplain.tableplusplugin/build/ui.html`, null)
        .evaluate(`displayPlan(${JSON.stringify(data, (_, value) => typeof value === 'undefined' ? null : value)})`);
}

global.onRun = function(context) {
    if (!['MySQL'].includes(context.driver())) {
        context.alert('Error', `Only MySQL databases are supported (${context.driver()} used).`);

        return;
    }

    const queryEditor = context.currentQueryEditor();
    if (queryEditor === null) {
        context.alert('Error', 'You have to select a query in the SQL Query editor.');

        return;
    }

    const sql = queryEditor.currentSelectedString();

    // The behaviour of the TablePlus query execution API is weird...
    // The results are sent to the closure (indicating async logic) but the next query will only be executed after the
    // current one is finished (indicating sync logic). Therefore, the code needs to be developed in async way but not
    // be complicated by pipelining the SQL queries.
    let resExplainJson = null;
    let resExplainTree = null;
    let resVersion = null;
    executeQuery(context, 'SELECT VERSION() as version ', (res) => resVersion = res);
    executeQuery(context, `EXPLAIN FORMAT=JSON ${sql}`, (res) => resExplainJson = res);
    executeQuery(context, `EXPLAIN FORMAT=TREE ${sql}`, (res) => {
        resExplainTree = res;

        handleResults(context, sql, resExplainJson, resExplainTree, resVersion);
    });
};
