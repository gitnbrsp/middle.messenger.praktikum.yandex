//@ts-nocheck
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: "auto",
        filename: '[name].[contenthash:5].js',
        chunkFilename: "[contenthash].chunk.js",
        path: path.resolve(__dirname, "./dist")
    },
    resolve: {
        extensions: ['.ts', '.js', '.json','.css']
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.(png|gif|eot|svg|ttf|ico|(jpeg|jpg)(\?[0-9]+)?)$/,
                type: "asset/resource"
            },
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./static/favicons/favicon.ico",
        }),
        new MiniCssExtractPlugin(),
    ],
}
