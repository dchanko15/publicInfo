module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ?'/publicinfo/'
        :'/',
    devServer: {
        proxy:  {
            '/Publicinfo/api': {
                target: 'http://80.241.242.124/',
                changeOrigin: true
            },
            '/public': {
                pathRewrite: {
                    '^/public': '/Publicinfo/public', // rewrite path
                },
                target: 'http://80.241.242.124/',
                changeOrigin: true
            },
        }
    }
}
