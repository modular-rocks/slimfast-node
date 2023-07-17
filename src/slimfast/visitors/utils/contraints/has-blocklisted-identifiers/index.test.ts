import traverse, { NodePath, Node } from '@babel/traverse';
import constraint from './index';
import parser from '../../parser';

describe('Has blocklisted identifiers', () => {
  test('', () => {
    const code = `x * y`;
    const ast = parser(code);
    let rootPath: NodePath | null = null;
    const data = {};

    traverse(ast, {
      ArrayExpression(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      const result = constraint(['x', 'y'])(rootPath, data, {}, ast);
      expect(result).toBe(true);
    }
  });

  test('', () => {
    const code = `true`;
    const ast = parser(code);
    let rootPath: NodePath | null = null;
    const data = {};

    traverse(ast, {
      ArrayExpression(path) {
        rootPath = path;
        path.stop();
      },
    });
    if (rootPath !== null) {
      const result = constraint(['x', 'y'])(rootPath, data, {}, ast);
      expect(result).toBe(false);
    }
  });
});
