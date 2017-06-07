var express = require('express');
var mysql  =  require('mysql');
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');



var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {

    var dstPath = './public/video/';
    var dsimage = './public/images/';
    fs.exists(dstPath, function (err) {
        console.log(err)
    })
    //ffmpeg -i 1.mp4 -codec:v libx264 -codec:a mp3 -map 0 -f ssegment -segment_format mpegts -segment_list playlist.m3u8 -segment_time 10 out%03d.ts


    //ffmpeg -i in.mkv -map 0 -codec:v libx264 -codec:a aac -f ssegment -segment_list out.list out%03d.ts
    //ffmpeg -re -i in.mkv -codec copy -map 0 -f segment -segment_list playlist.m3u8 \
    //-segment_list_flags +live -segment_time 10 out%03d.mkv
    // ffmpeg.ffprobe(dstPath + '1.mp4', function(err, metadata) {
    //     console.dir(metadata);
    // });
    var command = ffmpeg(dstPath + '1.mp4')
    //     // .screenshots({
    //     //     timestamps: [30.5, '50%', '01:10.123'],
    //     //     filename: 'thumbnail-at-%s-seconds.png',
    //     //     folder: dsimage,
    //     //     size: '320x240'
    //     // });
    //         .audioCodec('aac')
    //         .audioBitrate('128k')
    //         .videoCodec('libx264')
    //         .format('hls')
    //         .outputOptions([
    //             '-map 0',
    //             '-preset medium',
    //             '-profile:v baseline',
    //             '-use_localtime_mkdir 1',
    //             '-level 3.0',
    //             '-use_localtime 1',
    //             '-pix_fmt yuv420p',
    //             '-hls_segment_filename ' + dstPath +'%Y%m%d/file-%Y%m%d-%s.ts',
    //             '-hls_list_size 0',
    //             '-start_number 1'
    //         ])
    //
    //        .output(dstPath + 'big_bunny.m3u8')
    //         .on('start',function(cmd) {
    //             console.log('Command Line: '+ cmd);
    //         })
    //         .on('error',function (err) {
    //             console.log('FFMPEG ERROR ' + err);
    //         })
    //         .on('progress',function (progress) {
    //             console.log(progress);
    //         })
    //         .on('stderr', function(stderrLine) {
    //             console.log('Stderr output:' + stderrLine);
    //         })
    //         .run();



    // commod = ffmpeg({source: dstPath + '1.mp4'})
    //
    //     .outputOptions([
    //         '-map 0',
    //         '-f ssegment  ',
    //         '-segment_format mpegts ',
    //         '-segment_list playlist.m3u8',
    //         '-segment_time 10 out%03d.ts'
    //
    //     ])
    //     .videoCodec('libx264')
    //     .audioCodec('aac')
    //     .on('start', function(commandLine) {
    //         console.log('Spawned Ffmpeg with command: ' + commandLine);
    //     })
    //     .on('error', function(err, stdout, stderr) {
    //         console.log('Cannot process video: ' + err.message);
    //     })
    //     .save(dstPath + '22.avi')

      //  .withAspect('4:3')
    //     .withSize('1280x960')
    //     .videoBitrate('1024k')
    //     .addInput(dstPath + 'logo.jpg')
    //     .output(stream)
    //     .on('progress', function(progress) {
    //         console.log('Processing: ' + progress.percent + '% done');
    //     })
    //     .on('end', function() {
    //         console.log('file has been converted succesfully');
    //     })
    //     .on('error', function(err) {
    //         console.log('an error happened: ' + err.message);
    //     })
    //    .run();
    // Use the run() method to run commands with multiple outputs
    // ffmpeg(dstPath+ 'outtest.avi')
    //     .output(dstPath + 'outputfile.mp4')
    //     .output(stream)
    //     .on('end', function() {
    //         console.log('Finished processing');
    //     })
    //     .run();
    // commod = ffmpeg({source: videos + '1.mp4'})
    //     .on('end', function() {
    //         console.log('file has been converted succesfully');
    //     })
    //     .on('error', function(err) {
    //         console.log('an error happened: ' + err.message);
    //     })
    //     .save('outtest.avi');
    // var mysql_config = {
    //     host: '122.114.180.147',
    //     user: 'root',
    //     password: '123456',
    //     database:'app'
    // }
    // var course = mysql.createConnection(mysql_config)
    // course.connect()
    // $a = course.query("select * from app_user",function(err, rows, fields) {
    //     if (err) throw err;
    //     console.log('查询结果为: ', rows);
    // })
    // course.end()
  res.render('index', { title: 'Express' });
});

module.exports = router;
