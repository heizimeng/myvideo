var mysql = require('mysql');
var config=require('../config');

var option = {
	host: config.mysql.db_host,
	port: config.mysql.db_port,
	user: config.mysql.username,
	password: config.mysql.password,
	database: config.mysql.db_name
};

var DB={};

module.exports = DB;


