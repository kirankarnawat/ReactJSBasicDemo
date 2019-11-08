const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#1DA57A',
                    '@link-color': '#1DA57A',
                },
            },
        },
    ],
    webpack: {
        alias: {},
        plugins: [],
        configure: (webpackConfig, { env, paths }) => {
            if (!webpackConfig.plugins) {
                config.plugins = [];
            }

            webpackConfig.plugins.push(
                process.env.NODE_ENV === 'production'
                    ? new CopyWebpackPlugin([
                        {
                            from: 'src/lib/lms.js',
                        },
                    ])
                    : new CopyWebpackPlugin([
                        {
                            from: 'src/lib/lms.js',
                        },
                    ])
            );

            return webpackConfig;
        },
    },
};
