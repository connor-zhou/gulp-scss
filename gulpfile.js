var gulp = require('gulp');
var del = require('del');
var fileinclude = require('gulp-file-include');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var livereload = require('gulp-livereload');
var gulpautoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var spritesmith = require("gulp.spritesmith");
var privateConfig = require('./gulp-private-config.js');
var sourceMap = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var ipConfig = privateConfig;
console.log(privateConfig);

// change scss
let wwwActivityScss = ['../wwwV1/src/activities/**/*.scss'];
let weixinActivityScss = ['../weixin2.0/src/activities/**/*.scss'];
let webActivityScss = ['../web/qianxiang-v1-wap/WebContent/images/activity/2019_01spring/*.scss'];
gulp.task('web-activity-scss', function () {
	gulp.src(webActivityScss)
		// .pipe(sourceMap.init())
		.pipe(plumber({errorHandler: notify.onError('Error:<%=error.message%>')}))
		.pipe(sass())
		.pipe(gulpautoprefixer({
			browsers: ['last 100 versions'],
			cascade: true
		}))
		// .pipe(postcss([require('autoprefixer')]))
		// .pipe(sourceMap.write())
		.pipe(gulp.dest('../web/qianxiang-v1-wap/WebContent/images/activity/2019_01spring/'))
		.pipe(livereload())
});
gulp.task('wwwV1-activities-scss', function () {
	gulp.src(wwwActivityScss)
		// .pipe(sourceMap.init())
		.pipe(plumber({errorHandler: notify.onError('Error:<%=error.message%>')}))
		.pipe(sass())
		.pipe(gulpautoprefixer({
			browsers: ['last 100 versions'],
			cascade: true
		}))
		// .pipe(postcss([require('autoprefixer')]))
		// .pipe(sourceMap.write())
		.pipe(gulp.dest('../wwwV1/src/activities'))
		.pipe(livereload())
});

gulp.task('weixin-activities-scss', function () {
    gulp.src(weixinActivityScss)
    // .pipe(sourceMap.init())
        .pipe(plumber({errorHandler: notify.onError('Error:<%=error.message%>')}))
        .pipe(sass())
        .pipe(gulpautoprefixer({
            browsers: ['last 100 versions'],
            cascade: true
        }))
        // .pipe(postcss([require('autoprefixer')]))
        // .pipe(sourceMap.write())
        .pipe(gulp.dest('../weixin2.0/src/activities'))
        .pipe(livereload())
});
//定义监视任务
gulp.task('watch', function () {
    // gulp.watch(weixinActivityScss, ['weixin-activities-scss']);
    // gulp.watch(wwwActivityScss, ['wwwV1-activities-scss']);
    gulp.watch(webActivityScss, ['web-activity-scss']);
});
//connect
gulp.task('connect', function () {
	connect.server({
		root: ipConfig.root,
		host: ipConfig.ip,
		port: ipConfig.port,
		livereload: true,
		middleware: function (connect, opt) {
			return [
				proxy('/api', {
					target: 'http://localhost:5555',
					changeOrigin: true
				})
			]
		}
	})
});

//默认任务
gulp.task('default', [ 'watch', 'connect', 'web-activity-scss']);
