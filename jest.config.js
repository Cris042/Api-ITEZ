
function makeModuleNameMapper(srcPath, tsconfigPath) 
{
  const {paths} = require(tsconfigPath).compilerOptions;
  const aliases = {};

  Object.keys(paths).forEach((item) => 
  {
      const key = item.replace('/*', '/(.*)');
      const path = paths[item][0].replace('/*', '/$1');
      aliases[key] = srcPath + '/' + path;
  });

  return aliases;
}

const TS_CONFIG_PATH = './tsconfig.json';
const SRC_PATH = '<rootDir>/src';

module.exports = 
{
  'roots': [
      SRC_PATH
  ],
  'transform': {
      '^.+\\.tsx?$': 'ts-jest'
  },
  'moduleNameMapper': makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH)
};