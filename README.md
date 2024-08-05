# What is this

This is a TablePlus Plugin to visualize MySQL EXPLAIN plans with [mysqlexplain.com](https://mysqlexplain.com/).

![](https://github.com/tpetry/tableplus-mysql-explain/blob/main/.github/demo.gif)

# Install

## From release

Download [release](https://github.com/tpetry/tableplus-mysql-explain/releases), unzip and double-click on file plugin to install.

## Build from source

```
git clone git@github.com:tpetry/tableplus-mysql-explain.git
cd tableplus-mysql-explain/MysqlExplain.tableplusplugin
npm ci
npm run build
open .
```

# How to use

1. Open a SQL Query editor.
2. Select a statement.
3. Menu: Plugins -> Visual Explain SQL.
