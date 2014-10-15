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

function logAndExitWithError(e) {
	gutil.log(e);
	exitCode = 1;
}

// Bower
gulp.task('bower', function() {
	return bower('vendor/components')
		.pipe(gulp.dest('dist/vendor/components'));
});

// Vendor
gulp.task('vendor', function() {
	return gulp.src(['vendor/**/*.js', '!vendor/components'])
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))
		//.pipe(concat('main.js'))
		//.pipe(gulp.dest('dist/scripts'))
		//.pipe(rename({ suffix: '.min' }))
		//.pipe(uglify())
		.pipe(gulp.dest('dist/vendor'));
});

// Fonts
gulp.task('fonts', function() {
	return gulp.src(['fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'));
});

// Styles
gulp.task('styles', function() {
	return gulp.src('app/styles/**/*.scss')
		.pipe(sass({
			style: 'expanded',
			onError: function() {
				exitCode = 1;
			}
		}))
		.pipe(gulp.dest('dist/styles'));
});

// Elements HTML
gulp.task('elements', function() {
	return gulp.src('app/elements/**/*.html')
		.pipe(gulp.dest('dist/elements/'));
});

// Coffeescripts
gulp.task('coffee', function() {
	return gulp.src('app/**/*.coffee')
		.pipe(plumber())
		.pipe(
			coffee({ bare: true })
			.on('error', logAndExitWithError)
		)
		.pipe(gulp.dest('dist'));
});

// Base files
gulp.task('base', function() {
	return gulp.src(['app/*.html'])
		.pipe(gulp.dest('dist/'));
});

// Clean
gulp.task('clean', function() {
	return gulp.src('dist', { read: false }) // much faster
		.pipe(rimraf());
});

// Build task
gulp.task('build', ['clean'], function() {
	gulp.start('elements', 'styles', 'coffee', 'base');
});

// Watch task
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch(watch_root + '/app/styles/**/*.scss', ['styles']);

	// Watch element .html files
	gulp.watch(watch_root + '/app/elements/**/*.html', ['elements']);

	// Watch .coffee files
	gulp.watch(watch_root + '/app/**/*.coffee', ['coffee']);

	// Watch base files
	gulp.watch(watch_root + '/app/*', ['base']);

});
