const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = env === 'development';

const plugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
];

module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        development: isDev,
        useBuiltIns: true,
      },
    ],
  ],
  plugins,
};
