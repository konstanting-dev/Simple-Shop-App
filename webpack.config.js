const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/src',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg|woff|woff2|eot|ttf)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]'
                    }
                }],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
            //{ test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true
    }
};