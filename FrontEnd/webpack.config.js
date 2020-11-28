const path = require('path'); 
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 8080;

module.exports = {
    name: 'market-balgyun',
    mode: 'development', // 실서비스 할 때: production
    devtool: 'eval', 
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry:{	
        app : ['./src/index.js'],
    },
    module: { 
        rules : [
            { 
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            options: { 
                presets: ['@babel/preset-env','@babel/preset-react'] ,
                plugins: [
                    '@babel/plugin-syntax-class-properties',
                    'react-hot-loader/babel'
                ],
            },
            exclude: path.join(__dirname, 'node_modules'),
        },
        {
            test: /\.css?$/,
            use: ['style-loader', 'css-loader']
        },
    ]
    }, 
    output:{ // 출력
        path: path.join(__dirname, './dist/'), 
        publicPath: '/',
        filename: 'app.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/public/'),
        port: port,
        publicPath: 'http://localhost:'+port+'/dist/',
        hotOnly: true,
        proxy: {
            '/api':{
                target : 'http://localhost:3000/',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
    ]
}