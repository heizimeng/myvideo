var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var uuid = require('node-uuid');
var mysql = require('mysql');
var ffmpeg = require('../libraries/my_ffmpeg');
var config = require('../config');
var db_mysql = require('../models/db_mysql');
var io = require('socket.io')(8000)


var conn = mysql.createConnection({
        host: config.mysql.db_host,
        user: config.mysql.username,
        password: config.mysql.password,
        database:config.mysql.db_name,
        port: config.mysql.db_port
    });
//conn.connect();
var router = express.Router();
/* GET users listing. */
var info = '';
router.get('/list', function(req, res, next) {
       db_mysql.getAll('video',[],{},function (rows) {
            res.render('list',{
                data:rows
            });
       });
});

router.post('/upload_video',function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = config.upload.uploadTemp; //改变临时目录
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
            uploadDir =config.upload.videoPath + fName;
            fs.rename(file.path, uploadDir, function(err) {
                if (err) {
                    res.write(err + "\n");
                    res.end();
                }
                res.end();
            })
        }
    });
    form.on('end', function() {
        conn.query('insert into video (name,media_id,createtime)values(?,?,?)',[fName,medis_id,timestamp], function(err, result) {
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
//转码
router.post('/transcoding',function (req,res) {
    var id = req.body.id;

    db_mysql.getOne('video',[],{id:id},function (rows) {
        var dstPath = './public/upload/ts/';
        ffmpeg.command(rows.name)
            .audioCodec('aac')
            .audioBitrate('128k')
            .videoCodec('libx264')
            .format('hls')
            .outputOptions([
                '-map 0',
                '-preset medium',
                '-profile:v baseline',
                '-use_localtime_mkdir 1',
                '-level 3.0',
                '-pix_fmt yuv420p',
                '-hls_segment_filename ' + dstPath + rows.media_id +'-out%03d.ts',
                '-hls_list_size 0',
                '-start_number 1'
            ])
           .output(dstPath + rows.media_id +'.m3u8')
            .on('start',function(cmd) {
                var json = JSON.stringify({
                    anObject: {
                        result:'start'
                    },
                });
                res.end( json );
                //console.log('Command Line: '+ cmd);
            })
            .on('error',function (err) {
                //console.log('FFMPEG ERROR ' + err);
            })
            .on('end', function(stdout, stderr) {
               //console.log('Transcoding succeeded !');
            })
            .on('progress', function(progress) {

                console.log('Processing: ' + progress.percent + '% done');
            })
            .on('stderr', function(stderrLine) {
                //console.log('Stderr output:' + stderrLine);
            })
            .run();
    })
});


//删除
router.post('/delete',function (req,res,next) {
    var id = req.body.id;
    db_mysql.delete('video',{
        id:id
    },function (result) {
        var json = JSON.stringify({
            anObject: {
                result:'ok'
            },
        });
        res.end("success_jsonpCallback(" + json + ")");
    })
});




module.exports = router;









































