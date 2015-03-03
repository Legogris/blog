var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var bower_dir = __dirname + '/bower_components';

conf = {
	addVendor: function(name, path) {
	    var c = this;
	    c.resolve.alias[name] = path;
	    c.module.noParse.push(new RegExp('^'+path));
	    c.entry.vendors.push(name);
	},
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
        }
    },
    entry: {
        app: './src/client.js',
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
            { test: /\.jsx$/, loader: 'babel-loader?optional=runtime!jsx-loader', exclude: [/node_modules/, /bower_components/]},
            { test: /\.json$/, loader: 'babel-loader?optional=runtime!json-loader', exclude: [/node_modules/, /bower_components/]},
            { test: /\.js$/, loader: 'babel-loader?optional=runtime', exclude: [/node_modules/, /bower_components/]},
            { test: /\.html$/, loader: 'file?name=../static/[name].[ext]'},
            { test: /\.ttf$/, loader: 'file?name=../static/[name].[ext]?mimetype=application/octet-stream'},
            { test: /\.woff$/, loader: 'file?name=../static/[name].[ext]?mimetype=application/font-woff'},
            { test: /\.svg$/, loader: 'file?name=../static/[name].[ext]?mimetype=image/svg+xml'},
            { test: /\.eot$/, loader: 'file?name=../static/[name].[ext]'},
            { test: /\.png$/, loader: 'file?name=../static/[name].[ext]?mimetype=image/png'}
        ]
    },
    stats: {
        colors: true
    },
};

conf.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = conf;