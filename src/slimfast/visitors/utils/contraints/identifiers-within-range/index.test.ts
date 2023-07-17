import traverse, { NodePath, Node } from '@babel/traverse';
import constraint from './index';
import parser from '../../parser';

describe('Identifiers within range', () => {
  test('', () => {
    const code = `() => x * y * z * a * b * c`;
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
      const result = constraint(2, 4)(rootPath, data, {}, ast);
      expect(result).toBe(false);
    }
  });

  test('', () => {
    const code = `() => x * y`;
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
      const result = constraint(2, 4)(rootPath, data, {}, ast);
      expect(result).toBe(true);
    }
  });
});
