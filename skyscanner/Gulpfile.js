'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel'); // Lint JS files

gulp.task('build', () => {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('default', function () {
	gulp.watch( 'src/**/*.js', ['build'])
});