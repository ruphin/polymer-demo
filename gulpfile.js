// Load plugins
var gulp = require('gulp'),
		gutil = require('gulp-util'),
		sass = require('gulp-ruby-sass'),
		bower = require('gulp-bower'),
		//autoprefixer = require('gulp-autoprefixer'),
		//minifycss = require('gulp-minify-css'),
		//jshint = require('gulp-jshint'),
		//uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		rename = require('gulp-rename'),
		rimraf = require('gulp-rimraf'),
		//concat = require('gulp-concat'),
		//notify = require('gulp-notify'),
		cache = require('gulp-cache'),
		//lr = require('tiny-lr'),
		//server = lr(),
		through = require('through2'),
		cheerio = require('cheerio'),
		coffee = require('gulp-coffee'),
		plumber = require('gulp-plumber'),
		fs = require('fs');

var exitCode = null;

process.on('exit', function (code) {
	if (exitCode === null) {
		process.exit(code);
	} else {
		process.exit(exitCode);
	}
});

// Bower
gulp.task('bower', function() {
	return bower('dist/vendor/');
});

// Styles
gulp.task('styles', function() {
	return gulp.src('app/**/*.scss')
		.pipe(sass({
			style: 'expanded',
			onError: function() {
				exitCode = 1;
			}
		}))
		.pipe(gulp.dest('dist'));
});

// HTML
gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist/'));
});

// Coffeescripts
gulp.task('coffee', function() {
	return gulp.src('app/**/*.coffee')
		.pipe(plumber())
		.pipe(coffee({ bare: true }))
		.pipe(gulp.dest('dist'));
});

// Base files
gulp.task('base', function() {
	return gulp.src(['app/*.html'])
		.pipe(gulp.dest('dist/'));
});

// Clean
gulp.task('clean', function() {
	return gulp.src(['dist/*', '.sass-cache'], { read: false }) // much faster
		.pipe(rimraf());
});

// Build task
gulp.task('build', ['clean'], function() {
	gulp.start('html', 'styles', 'coffee', 'base', 'bower');
});

// Watch task
gulp.task('watch', function() {
	var watch_root = process.cwd();

	// Watch .scss files
	gulp.watch(watch_root + '/app/**/*.scss', ['styles']);

	// Watch element .html files
	gulp.watch(watch_root + '/app/**/*.html', ['html']);

	// Watch .coffee files
	gulp.watch(watch_root + '/app/**/*.coffee', ['coffee']);

	// Watch base files
	gulp.watch(watch_root + '/app/*', ['base']);

});
