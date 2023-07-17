// not sure why this is returning undefined when using import
// works in some environments and not others
// eslint-disable-next-line @typescript-eslint/no-require-imports
const parser = require('@babel/parser');

const babelConfig: RandomObject = {
  sourceType: 'module',
  createParenthesizedExpressions: true,
  plugins: ['jsx', ['typescript', { isTSX: true }], 'babel-plugin-recast'],
};

export default (code: string) => parser.parse(code, babelConfig);
