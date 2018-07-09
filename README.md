# What is this

This is a TablePlus Plugin to send MySQL and MariaDB EXPLAIN information to [explainmysql.com](https://explainmysql.com/)

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
3. Menu: Plugins -> Explain SQL.
