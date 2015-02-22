'use strict';

var webpack = require('webpack');
var webpackConf = require('./webpack.config.js');

var config = {
    clean: ['build'],
    concurrent: {
        dev: ['nodemon:app', 'webpack:dev'],
        options: {
            logConcurrentOutput: true
        }
    },
    jshint: {
        all: [
            '*.js',
            '{actions,configs,components,services,stores}/**/*.js'
        ],
        options: {
            jshintrc: true
        }
    },
    nodemon: {
        app: {
            script: './server.js',
            options: {
                ignore: ['build/js/**'],
                nodeArgs: ['--harmony'],
                ext: 'js,jsx'
            }
        }
    },
    webpack: {
        options: webpackConf,
        prod: {
            output: {
                path: './dist/js',
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({minimize: true})
            ]
        },
        dev: {
            output: {
                path: './build/js',
                pathInfo: true
            },
            devtool: 'sourcemap',
            watch: true,
            keepalive: true,
        }
    }
};


module.exports = function (grunt) {
    grunt.initConfig(config);

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-pure-grids');

    // tasks
    grunt.registerTask('livereload', 'live reloading', function() {
        require('tiny-lr')().listen(35729, function(err) { console.log('LR Server Started'); });
    });
    grunt.registerTask('default', ['clean', 'jshint', 'concurrent:dev']);
};

