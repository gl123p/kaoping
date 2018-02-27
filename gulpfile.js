
var gulp = require('gulp')
var minifyCss = require('gulp-minify-css')
var connect = require('gulp-connect')
var notify = require('gulp-notify')
var sass = require('gulp-ruby-sass')

//编译
//sasstocss
gulp.task('sasstocss',function () {
    return sass('sass/*.scss')
        .on('error',function (err) {
            console.log('error!',err.message);
        })
        .pipe(gulp.dest('css/'))
        .pipe(notify({message:"css文件被改动了"}))
        .pipe(connect.reload())
});

//css
gulp.task('css',function () {
    gulp.src('css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
})

//html
gulp.task('html',function () {
    gulp.src('*.html')
        .pipe(connect.reload())
        .pipe(notify({message:"html文件被改动了"}))
})

//js

gulp.task('connect',function () {
    connect.server({
        root:'./',
        ip:"localhost",
        port:"8090",
        livereload:true//代码改动，浏览器实时刷新
    })
})

//监视文件改动 watch(文件，[任务1，任务2，……])
gulp.task('auto',function () {
    //表示根目录下的html文件一旦有改动，就立即执行html任务
    gulp.watch('*.html',['html'])
    gulp.watch('sass/*.scss',['sasstocss','css'])
})

gulp.task('default',['css','connect','html','auto','sasstocss'])