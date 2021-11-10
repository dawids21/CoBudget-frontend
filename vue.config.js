const env = {};

[
    'VUE_APP_BACKEND_URL',
    'VUE_APP_BACKEND_TIMEOUT',
    'VUE_APP_OKTA_URI',
    'VUE_APP_OKTA_CLIENT_ID',
    'VUE_APP_OKTA_REDIRECT_URI',
].forEach(function (key) {
    if (!process.env[key]) {
        throw new Error(`Environment variable ${key} must be set. See README.md`)
    }
    env[key] = JSON.stringify(process.env[key])
})

module.exports = {
    transpileDependencies: [
        'vuetify',
    ],
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'CoBudget'
                return args
            })
        config
            .plugin('define')
            .tap(args => {
                const base = args[0]['process.env']
                args[0]['process.env'] = {
                    ...base,
                    ...env,
                }
                return args
            })
    },
}
