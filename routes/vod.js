var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var uuid = require('node-uuid');
var mysql = require('mysql');
var db = require('../config');


// var redis = require("redis"),client = redis.createClient();
// client.on("error", function (err) {
//     console.log("Error " + err);
// });
//client.set("string key", "string val", redis.print);

var conn = mysql.createConnection({
        host: db.mysql.db_host,
        user: db.mysql.username,
        password: db.mysql.password,
        database:db.mysql.db_name,
        port: db.mysql.db_port
    });
conn.connect();
var router = express.Router();
/* GET users listing. */
var info = '';
router.get('/list', function(req, res, next) {
    conn.query("select * from video;" ,function (err,rows) {
        if (err) throw err;
        info = rows
    })

    res.render('list',{
        data:info
    });

});

router.post('/upload_video',function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upload/temp/"; //改变临时目录
    var fName = '';
    var uploadDir = '';
    var medis_id = '';
    var timestamp=new Date().getTime();
    var filename = '';
    form.parse(req, function(error, fields, files) {
        for (var key in files) {
            var file = files[key];
            fName = medis_id = uuid.v1();
            path = file.path;
            switch (file.type) {
                case "video/mp4":
                    fName = fName + ".mp4";
                    break;
                default:
                    fName =  fName + ".mp4";
                    break;
            }
            uploadDir = "./public/upload/" + fName;
            filename = file.name;
            // conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            //     if (err) throw err;
            //     console.log('The solution is: ', rows[0].solution);
            // });
            // conn.end();
            //console.log(file, file.size);
            // var uploadDir = "./public/upload/" + fName;
            // fs.rename(file.path, uploadDir, function(err) {
            //     if (err) {
            //         res.write(err + "\n");
            //         res.end();
            //     }
            //     //res.write("upload image:<br/>");
            //     res.write("<img src='/upload/" + fName + "' />");
            //     res.end();
            // })
        }
    });
    form.on('end', function() {

        conn.query('insert into video (name,media_id,createtime)values(?,?,?)',[filename,medis_id,timestamp], function(err, result) {
            if (err) throw err;
            var json = JSON.stringify({
                anObject: {
                    result:'ok'
                },
            });
            res.end("success_jsonpCallback(" + json + ")");
        });
        conn.end();
    });
});
module.exports = router;
