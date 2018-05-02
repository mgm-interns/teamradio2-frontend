const path = require('path');

const appRoot = path.resolve(process.cwd());

const resolveApp = pathStr => path.resolve(appRoot, pathStr);

module.exports = {
  appRoot,
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appNodeModules: resolveApp('node_modules'),
  appBabelRc: resolveApp('.babelrc.js'),
  appTsConfigJson: resolveApp('tsconfig.json'),
  appTsLintJson: resolveApp('tslint.json'),
  appServiceWorker: resolveApp('build/sw.js'),
};
