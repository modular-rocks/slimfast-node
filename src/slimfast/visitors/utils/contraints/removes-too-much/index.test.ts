import traverse, { NodePath, Node } from '@babel/traverse';
import constraint from './index';
import parser from '../../parser';

describe('Removes too much', () => {
  const code = `() => 3 * 7`;
  const ast = parser(code);
  let rootPath: NodePath | null = null;
  const data = {};

  traverse(ast, {
    Expression(path) {
      rootPath = path;
      path.stop();
    },
  });
  test('', () => {
    if (rootPath !== null) {
      const result = constraint(3)(rootPath, data, {}, ast);
      expect(result).toBe(true);
    }
  });
});
