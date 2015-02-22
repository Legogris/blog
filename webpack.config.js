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
            { test: /\.jsx$/, loader: 'babel-loader!jsx-loader', exclude: [/node_modules/, /bower_components/]},
            { test: /\.json$/, loader: 'babel-loader!json-loader'},
            { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/, /bower_components/]}
        ]
    },
    stats: {
        colors: true
    },
};

conf.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = conf;