const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin ({
    template: './src/index.html',
    filename: 'index.html'
})

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, 
            {
                test: /\.css$/,
                use: [
                  {
                    loader: "style-loader"
                  },
                  {
                    loader: "css-loader"
                  },
                ]
            }, 
        ]
    },
    plugins: [htmlPlugin]
}
