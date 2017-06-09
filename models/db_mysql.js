var mysql = require('mysql');
var config=require('../config');



var DB={};

/*
* @param table  表名 String
* @param fileds 字段 Array
* @param where  条件 Object
 */

DB.getOne = function (table,fileds,wheres,callback) {
	var filed = '' ,where = '';
	if (fileds &&  fileds.length > 0 ){
		for (var i = 0 ; i< fileds.length ; i++){
			filed += fileds[i] + ',';
		}
		filed = filed.substring(0,filed.length-1);
	}else{
		filed += "*";
	};
	if (wheres){
		where += ' where '
		for(var i in wheres){
			where += ' ' + i + ' = "' + wheres[i] +'" '
		}
	}else {
		where += " where 1";
	};
	var sql = 'select '+ filed +' from ' + table + where +' limit 1' ;
	DB.execs(sql,function (err,rows) {
		callback(rows[0])

    })
};

DB.getAll = function (table,fileds,wheres,callback) {
	var filed = '' ,where = '';
	if (fileds &&  fileds.length > 0 ){
		for (var i = 0 ; i< fileds.length ; i++){
			filed += fileds[i]+ ',';
		}
		filed = filed.substring(0,filed.length-1);
	}else{
		filed += "*";
	};

	if (wheres && (typeof(wheres)   ==   "undefined")){
		where += ' where '
		for(var i in wheres){
			where += ' ' + i + wheres[i] +' '
		}
	}else {
		where += " where 1";
	};
	var sql = 'select '+ filed +' from ' + table + where ;
	DB.execs(sql,function (err,rows) {
		callback(rows)

    })
};
DB.delete = function (table,where,callback) {
	var db = table;
	if (typeof where === 'object'){
		 DB.fetch(where,function (fwhere) {
             var sql = 'delete from ' + table + fwhere;
             DB.execs(sql,function (err,rows) {
                 callback(rows)
             })
         })
	}
};

DB.update = function () {
	var sql = '';
	DB.execs(sql,function (err,rows) {
		callback(rows)
    });
};

DB.insert = function () {
	var sql = '';
	DB.execs(sql,function (err,rows) {
		callback(rows)
    });
};

DB.execs = function (sql,callback) {
    DB.connects().query(sql,function (err, rows, fields) {
		callback(err,rows);
    });
};

DB.fetch = function (where,callback) {
	var swhere = ' where ';
    for(var i in where){
        swhere +=  i + ' = "' + where[i] + '" AND ';
	}
    swhere += ' 1 ';
	callback(swhere);
}



//连接数据库
DB.connects = function () {
	var option = {
		host: config.mysql.db_host,
		port: config.mysql.db_port,
		user: config.mysql.username,
		password: config.mysql.password,
		database: config.mysql.db_name
	};
	var instance = mysql.createConnection(option)
	instance.connect();
	return instance;
};
module.exports = DB;


