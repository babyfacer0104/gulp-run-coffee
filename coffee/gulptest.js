var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var coffeelint = require('gulp-coffeelint');
var requirejs = require('requirejs');
var rimraf = require('rimraf');
var path = require('path');
var fs=require('fs');
var tap = require('gulp-tap');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var _ = require('underscore');

var paths = {
    json: ['./modulespackage.json'],
    coffee: ['./test.coffee', './*.coffee'],
    js: ['./js/test.js']
};

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};

gulp.task('default', gulpSequence('clean','coffee','readJS'));


//删除文件
gulp.task('clean', function (cb) {
    return del([
        './js/*.js'
    ], cb);
});

//coffee编辑成js
gulp.task('coffee', function(){
    console.log('<<<<<<<<<<coffee编辑成js');
    return gulp.src(paths.coffee[0])
        .pipe(coffee())
        .pipe(gulp.dest('./js'));
});

//读取JSON文件、读取js文件
gulp.task('readJS', function () {
    console.log('<<<<<<<<<<读取JSON文件|读取js文件');
    return gulp.src(paths.js[0].toString())
        .pipe(tap(function(file){
            fs.readFile(paths.json.toString(),function(err,data){
                var jsonData = JSON.parse(data);
                var fileContent = file.contents.toString();

                var arr_colNames = '';
                _.each(jsonData.colNames, function(v, i){
                    arr_colNames += i+': "'+ v+'",';
                });
                var arr_colModel = [];
                _.each(jsonData.colModel, function(v, i){
                    //arr_colModel.push({"name": v});
                    if(v == 'id'){
                        arr_colModel += '{name: "'+ v+'", hidden: true},';
                    }
                    else{
                        arr_colModel += '{name: "'+ v+'"},';
                    }
                });

                fileContent = fileContent
                    .replace("tabId: ''", "tabId: '"+jsonData.tabId+"'")
                    .replaceAll("untitled-grid", jsonData.gid)
                    .replace("rsId: ''", "rsId: '"+jsonData.rsId+"'")
                    .replace("url: url._('')", "url: url._('"+jsonData.url+"')")
                    .replace("colNames: {}", "colNames: {"+arr_colNames.substring(0, arr_colNames.length-1)+'}')
                    .replace("colModel: []", "colNames: ["+arr_colModel.substring(0, arr_colModel.length-1)+']');
                fs.writeFileSync(paths.js.toString(), fileContent);
            });
        }))
});

//gulp.task('watch', function() {
//    gulp.watch(paths.scripts, ['scripts']);
//    //console.log(gulp.watch(paths.scripts, ['scripts']));
//});