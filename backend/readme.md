## start

```sh
npm intall
npm run start
```

## dev debug

```sh
npm install
npm run dev
```

## Database

### Setup

1. first download mySQL community GPL
   - 下載過程中會設定帳號密碼，要記住
   - 應該會同時會下載 mysql workbench，他是一個比較漂亮的介面，避免使用看起來很嚇人的 command line
2. mysql execautable is stored at `/usr/local/mysql/bin/mysql`, you need to execute it with this path
3. use alias to make it easier (source: [mysql official MacOS note](https://dev.mysql.com/doc/mysql-macos-excerpt/8.0/en/macos-installation-notes.html))

```sh
# alias to shorten command
alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
```

如果你的 shell 是使用 zsh，你可以把上面的 alias code 寫進去 `~/.zshrc` 檔案裡面，這樣之後只要一打開 command line 就會立刻把這個 alias 做好，不用每次重新下指令

如果是用 bash 或是其他 shell，也會有類似的 shell configuration file 可以把指令寫進去，例如 `~/.bashrc` 之類的

4. make sure MySQL server is ready to be connected

```sh
mysql --help
```

### Login and Logout

connect to MySQL server, login with password

```sh
# login to local server
$> mysql -u [user] -p
# eg. user: root, password: rootlogin
$> mysql -u root -p
password> rootlogin
# QUIT
mysql> QUIT;
mysql> \q
```

### create the database and table from .sql file

In mysql commandline

```sh
# the filename has to be the full path
mysql> source [file_name]
# 以本次 project 來說就是
mysql> source ~/[你的path]/Find-my-student-card/backend/src/lost_found.sql
```

或者也可以 mysql workbench 來匯入（請上網看教學）

## database, tables, simple query

記得幾乎所有指令都要加分號 ';'

```sh
# show all databases
mysql> show databases;
# use lost_found database （之後才能 access 裡面的 tables）
mysql> use lost_found;
# show tables
mysql> show tables;
# query user table
mysql> select * from user;
```
