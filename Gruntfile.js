'use strict';

var bower_dir = __dirname + '/bower_components';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function addVendor(name, path) {
    var c = config.webpack.dev;
    c.resolve.alias[name] = path;
    c.module.noParse.push(new RegExp('^'+path));
    c.entry.vendors.push(name);
}

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
                ignore: ['build/**'],
                nodeArgs: ['--harmony'],
                ext: 'js,jsx'
            }
        }
    },
    webpack: {
        dev: {
            resolve: {
                extensions: ['', '.js', '.jsx'],
                alias: {
                }
            },
            entry: {
                app: './client.js',
                vendors: []
            },
            plugins: [
                new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
                new ExtractTextPlugin('../css/style.css', { allChunks: true })
            ],
            output: {
                path: './build/js',
                publicPath: '/public/js/',
                filename: '[name].js'
            },
            module: {
                noParse: [bower_dir + '/react/react.min.js'],
                loaders: [
                    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
                    { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
                    { test: /\.jsx$/, loader: 'jsx-loader' },
                    { test: /\.json$/, loader: 'json-loader'}
                ]
            },
            stats: {
                colors: true
            },
            devtool: 'sourcemap',
            watch: true,
            keepalive: true
        }
    }
};

addVendor('react', bower_dir + '/react/react.min.js');

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

