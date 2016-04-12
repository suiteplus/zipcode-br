'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    appRoot = process.cwd(),
    paths = {
        jsSrc: [`${appRoot}/src/**/*.js`],
        jsTests: [`${appRoot}/test/**/*-test.js`]
    };

gulp.task('test', ['env:test', 'test:eslint', 'test:coverage']);

gulp.task('env:test', () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.NODE_ENV = 'test';
});

gulp.task('test:eslint', () => {
    return gulp.src(paths.jsSrc.concat(paths.jsTests))
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
});

gulp.task('test:coverage', ['test:eslint'], () => {
    
    let executeTests = () => {
        gulp.src(paths.jsTests)
            .pipe(plugins.plumber())
            .pipe(plugins.mocha({
                reporters: 'spec'
            }))
            .pipe(plugins.istanbul.writeReports({
                reports: ['lcovonly']
            })); // Creating the reports after tests runned
    };

    // instrumentation *.js
    gulp.src(paths.jsSrc)
        .pipe(plugins.plumber())
        .pipe(plugins.istanbul({
            includeUntested: true
        })) // Covering files
        .pipe(plugins.istanbul.hookRequire())// Force `require` to return covered files
        .on('finish', () => executeTests());
    
});