var ffmpeg = require('fluent-ffmpeg')
var config = require('../config');


var my_ffmpeg = {};

my_ffmpeg.command = function (video) {
    return ffmpeg({
       source:config.upload.videoPath + video
    });
};
my_ffmpeg.getVideoInfo = function (video,callback) {
    this.command(video).ffprobe(function (err,info) {
        callback(err,info)
    })
};




module.exports  = my_ffmpeg;