var path = require("path"),
    webpack = require("webpack");

var node_modules = path.resolve(__dirname, 'node_modules');

var ExtractTextPlugin = require("extract-text-webpack-plugin");


var config = {

    devtool: "source-map",

    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },

    addLoader: function(loader){
        this.module.loaders.push(loader);
    },

    addPlugin: function(plugin){
        this.plugins.push(plugin);
    },

    entry: {
        app: [ path.resolve(__dirname, "src/app.js") ],
        vendors: ["react", "react-dom", "redux", "react-redux", "redux-thunk"]
    },

    resolve: {
        alias: {}
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: "bundle.js"
    },

    clearBeforeBuild: true,

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        noParse: [],

        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: "url-loader?limit=10240"
        }]
    }
};




if(process.env.NODE_ENV != 'production'){
    console.log("development enviroment...");
    // config.addVendor("react", 
    //     path.resolve(node_modules, 'react/dist/react-with-addons.js'));
    // config.addVendor("react-dom", 
    //     path.resolve(node_modules,'react-dom/dist/react-dom.js' ));
    config.entry.app.unshift('webpack-hot-middleware/client');
    config.addLoader({
        test: /\.css$/,
        loader: "style!css"
    });
    config.addLoader({
        test: /\.less$/,
        loader: "style!css!less"
    });

    config.addPlugin( new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }));

}else{
    console.log("production enviroment...");
    config.addLoader({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
    });
    config.addLoader({
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "less-loader")  
    });

    config.addPlugin( new ExtractTextPlugin("css/app.css") );
    // screw_ie8: true表示不兼容ie8
    config.addPlugin( new webpack.optimize.UglifyJsPlugin({ 
        comments: false,
        warnings: false,
        screw_ie8: true
    }));
}


module.exports = config;
